import Bj from '../../models/bjModel.js'
import calcPoints from '../../util/bj/calcPoints.js'
import cards from '../../util/bj/cards.js'
import dealerPlay from '../../util/bj/dealerPlay.js'
import calcMultiplier from '../../util/bj/calcMultiplier.js'

const bjDouble = async (req, res) => {
  try {
    const user = req.user
    if (!user.bj) {
      return res.status(403).json({msg: 'Start a new game'})
    }
    const bj = await Bj.findById(user.bj)
    if (Math.round(bj.betAmount * 2) / 100 > user.balance) {
      return res.status(403).json({msg: 'Insuficient coins'})
    }
    if (bj.player.length === 0) {
      return res.status(403).json({msg: "You cant't double after split"})
    }

    const player = [...bj.player, cards[Math.floor(Math.random() * cards.length)]]
    const playerPoints = calcPoints(player)
    let dealer = bj.dealer
    let dealerPoints = calcPoints(dealer)
    if (playerPoints <= 21) {
      dealer = dealerPlay(dealer)
      dealerPoints = calcPoints(dealer)
    }
    const m = calcMultiplier(bj)
    user.balance += Math.round(bj.betAmount * 2 * m) / 100
    user.bj = ''
    await user.save()
    await bj.deleteOne()
    res.status(200).json({
      balance: user.balance,
      dealer,
      dealerPoints,
      player,
      playerPoints
    })
  } catch (err) {
    console.log('error in bjDouble controller', err)
    res.status(500).json({msg: 'Server Error'})
  }
}
export default bjDouble