import Bj from '../../models/bjModel.js'
import cards from '../../util/bj/cards.js'
import calcPoints from '../../util/bj/calcPoints.js'
import calcLvl from '../../util/calcLvl.js'

const bjBet = async (req, res) => {
  try {
    const user = req.user
    if (user.bj) {
      return res.status(403).json({
        msg: 'You already started a game'
      })
    }
    let {betAmount} = req.body
    if (typeof betAmount !== 'number') {
      return res.status(400).json({
        msg: 'bet amount must be a number'
      })
    }
    betAmount = Math.round(betAmount * 100)
    calcLvl(betAmount, user)
    const dealer = [cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)]]
    const player = [cards[Math.floor(Math.random() * cards.length)], cards[Math.floor(Math.random() * cards.length)]]
    const dealerPoints = calcPoints(dealer)
    const playerPoints = calcPoints(player)
    if (playerPoints === 21) {
      if (dealerPoints !== 21) {
        user.balance += Math.round(betAmount * 2.5) / 100
        await user.save()
      }
      return res.status(200).json({
        bj: true,
        balance: user.balance,
        dealer,
        player,
        dealerPoints,
        playerPoints,
        lvl: user.lvl,
        exp: user.exp
      })
    }
    const bj = await Bj.create({
      dealer,
      player,
      betAmount,
    })
    user.bj = bj._id
    await user.save()
    res.status(200).json({
      dealer: [dealer[0]],
      dealerPoints: calcPoints([dealer[0]]),
      player,
      playerPoints,
      lvl: user.lvl,
      exp: user.exp
    })
  } catch (err) {
    console.log('error in bjBet controller', err)
    res.status(500).json({msg: 'Server Error'})
  }
}

export default bjBet

