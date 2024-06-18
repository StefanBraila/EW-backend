import Session from '../../models/sessionModel.js'

const logout = async (req, res) => {
  try {
    const sessionId = req.cookies.id
    if (!sessionId) {
      return res.status(200).json({
        msg: 'You are not logged in'
      })
    }
    const session = await Session.findById(sessionId)
    if (!session) {
      return res.status(200).json({
        msg: 'You are not logged in'
      })
    }
    await session.deleteOne()
    res.clearCookie('id')
    res.status(200).json({msg: 'logout succesfuly'})
  } catch (err) {
    console.log('error in logout controller', err)
    res.status(500).json({msg: 'Server Error'})
  }
}

export default logout