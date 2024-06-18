import Bj from '../../models/bjModel.js'
import cards from '../../util/bj/cards.js'
import calcPoints from '../../util/bj/calcPoints.js'
import calcMultiplier from '../../util/bj/calcMultiplier.js'
import dealerPlay from '../../util/bj/dealerPlay.js'

const bjHit = async (req, res) => {
  try {
    const user = req.user
    if (!user.bj) {
      return res.status(403).json({msg: 'Start a new game'})
    }
    const bj = await Bj.findById(user.bj)
    const randCard = cards[Math.floor(Math.random() * cards.length)]
    let dealer = bj.dealer
    let dealerPoints = calcPoints(dealer)

    if (bj.player.length !== 0) {
      const player = [...bj.player, randCard]
      bj.player = player
      await bj.save()
      const playerPoints = calcPoints(player)
      if (playerPoints >= 21) {
        if (playerPoints === 21) {
          dealer = dealerPlay(dealer)
          dealerPoints = calcPoints(dealer)
        }
        const m = calcMultiplier(bj)
        const betAmount = bj.betAmount
        user.balance += Math.round(betAmount * m) / 100
        user.bj = ''
        await user.save()
        await bj.deleteOne()
        return res.status(200).json({
          balance: user.balance,
          dealer,
          dealerPoints,
          player,
          playerPoints
        })
      }
      return res.status(200).json({
        player,
        playerPoints
      })
    }

    if (bj.activeHand === 1) {
      const player1 = [...bj.player1, randCard]
      bj.player1 = player1
      const playerPoints1 = calcPoints(player1)
      if (playerPoints1 >= 21) bj.activeHand = 2
      await bj.save()
      return res.status(200).json({
        player1,
        playerPoints1,
        activeHand: bj.activeHand
      })
    }
    const player2 = [...bj.player2, randCard]
    bj.player2 = player2
    const playerPoints2 = calcPoints(player2)
    if (playerPoints2 >= 21) {
      if (calcPoints(bj.player1) === 21 || playerPoints2 === 21) {
        dealer = dealerPlay(dealer)
        dealerPoints = calcPoints(dealer)
      }
      const m = calcMultiplier(bj)
      const betAmount = bj.betAmount
      user.balance += Math.round(betAmount * m) / 100
      user.bj = ''
      await user.save()
      await bj.deleteOne()
      return res.status(200).json({
        balance: user.balance,
        dealer,
        dealerPoints,
        player2,
        playerPoints2
      })
    }
    res.status(200).json({
      player2,
      playerPoints2,
    })
  } catch (err) {
    console.log('error in bjHit controller', err)
    res.status(500).json({msg: 'Server Error'})
  }
}

export default bjHit