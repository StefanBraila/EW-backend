import Bj from '../../models/bjModel.js'
import cards from '../../util/bj/cards.js'
import calcPoints from '../../util/bj/calcPoints.js'
import dealerPlay from '../../util/bj/dealerPlay.js'

const bjSplit = async (req, res) => {
  try {
    const user = req.user
    if (!user.bj) {
      return res.status(403).json({msg: 'Start a new game'})
    }
    const bj = await Bj.findById(user.bj)
    if (bj.player.length === 0) {
      return res.status(403).json({msg: 'You already did split'})
    }
    if (calcPoints([bj.player[0]]) !== calcPoints([bj.player[1]])) {
      return res.status(403).json({msg: "You can only split the same cards"})
    }

    let dealer
    let dealerPoints
    const player1 = [bj.player[0], cards[Math.floor(Math.random() * cards.length)]]
    const player2 = [bj.player[1], cards[Math.floor(Math.random() * cards.length)]]
    bj.player1 = player1
    bj.player2 = player2
    bj.player = []
    const playerPoints1 = calcPoints(player1)
    const playerPoints2 = calcPoints(player2)
    if (playerPoints1 === 21) bj.activeHand = 2
    if (playerPoints1 === 21 && playerPoints2 === 21) {
      dealer = dealerPlay(bj.dealer)
      dealerPoints = calcPoints(dealer)
      if (dealerPoints !== 21) user.balance += Math.round(bj.betAmount * 3) / 100
      user.bj = ''
      await bj.deleteOne()
    }
    await bj.save()
    await user.save()
    res.status(200).json({
      balance: user.balance,
      dealer,
      dealerPoints,
      player1,
      player2,
      playerPoints1,
      playerPoints2,
      activeHand: bj.activeHand
    })
    
  } catch (err) {
    console.log('error in bjSplit controller', err)
    res.status(500).json({msg: 'Server Error'})
  }
}

export default bjSplit