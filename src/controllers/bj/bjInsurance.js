import Bj from '../../models/bjModel.js'
import calcPoints from '../../util/bj/calcPoints.js'

const bjInsurance = async (req, res) => {
  try {
    const user = req.user
    if (!user.bj) {
      return res.status(403).json({msg: 'Start a new game'})
    }
    const bj = await Bj.findById(user.bj)
    if (bj.insurance) {
      return res.status(403).json({msg: 'You already took insurance'})
    }
    if (bj.dealer[0][0] !== 'A') {
      return res.status(403).json({msg: "You can't take insurance if dealer first card is not an ace"})
    }
    if (bj.player.length === 0) {
      return res.status(403).json({msg: "You cant't take insurance after split"})
    }
    if (Math.round(bj.betAmount * 1.5) / 100 > user.balance) {
      return res.status(403).json({msg: 'Insuficient coins'})
    }

    const dealer = bj.dealer
    const dealerPoints = calcPoints(dealer)
    if (dealerPoints === 21) {
      user.bj = ''
      await user.save()
      await bj.deleteOne()
      return res.status(200).json({
        dealer,
        dealerPoints,
        msg: 'Dealer has Blackjack'
      })
    }
    user.balance -= Math.round(bj.betAmount / 2) / 100
    await user.save()
    res.status(200).json({
      balance: user.balance,
      msg: "Dealer doesn't have Blackjack"
    })

  } catch (err) {
    console.log('error in bjInsurance controller', err)
    res.status(500).json({msg: 'Server Error'})
  }
}
export default bjInsurance