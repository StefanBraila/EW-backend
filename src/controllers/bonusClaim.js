

const bonusClaim = async (req, res) => {
  try {
    const user = req.user
    const t = Date.now()
    if (t - user.bonus < 1000 * 60 * 5) {
      return res.status(403).json({msg: 'You can claim the bonus every 5 min'})
    }
    user.balance = Math.round(user.balance * 100 + 10000) / 100
    user.bonus = t
    await user.save()
    res.status(200).json({balance: user.balance})
  } catch(err) {
    console.log('error in claimBonus controller, ', err)
    res.status(500).json({msg: 'Server Error'})
  }
}
export default bonusClaim