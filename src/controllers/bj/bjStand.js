import Bj from '../../models/bjModel.js'
import calcMultiplier from '../../util/bj/calcMultiplier.js'
import calcPoints from '../../util/bj/calcPoints.js'
import dealerPlay from '../../util/bj/dealerPlay.js'

const bjStand = async (req, res) => {
  try {
    const user = req.user
    if (!user.bj) {
      return res.status(403).json({msg: 'Start a new game'})
    }
    const bj = await Bj.findById(user.bj)

    const dealer = dealerPlay(bj.dealer)
    const dealerPoints = calcPoints(dealer)

    if (bj.player.length !== 0) {
      const m = calcMultiplier(bj)
      user.balance += Math.round(bj.betAmount * m) / 100
      user.bj = ''
      await user.save()
      await bj.deleteOne()
      return res.status(200).json({
        balance: user.balance,
        dealer,
        dealerPoints
      })
    }

    if (bj.activeHand === 1) {
      bj.activeHand = 2
      await bj.save()
      return res.status(200).json({
        activeHand: 2
      })
    }

    const m = calcMultiplier(bj)
    user.balance += Math.round(bj.betAmount * m) / 100
    user.bj = ''
    await user.save()
    await bj.deleteOne()
    res.status(200).json({
      balance: user.balance,
      dealer,
      dealerPoints
    })
  } catch (err) {
    console.log('error in bjStand controller', err)
    res.status(500).json({msg: 'Server Error'})
  }
}

export default bjStand