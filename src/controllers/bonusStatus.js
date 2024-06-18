

const bonusStatus = async (req, res) => {
  try {
    const user = req.user
    let status = 'can claim'
    const t = Date.now()
    if (t - user.bonus < 1000 * 60 * 5) status = 300 - Math.ceil((t - user.bonus) / 1000)
    res.status(200).json({status})
  } catch(err) {
    console.log('error in bonusStatus controller', err)
    res.status(500).json({msg: 'Server Error'})
  }
}
export default bonusStatus