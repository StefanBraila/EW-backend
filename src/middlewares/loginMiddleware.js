import User from '../models/userModel.js'
import Session from '../models/sessionModel.js'

const loginMiddleware = async (req, res, next) => {
    try {
        const sessionId = req.cookies.id
        if (!sessionId) {
            return res.status(401).json({msg: 'Please Log In'})
        }
        const session = await Session.findById(sessionId)
        if (!session) {
            return res.status(401).json({msg: 'Please Log In'})
        }
        const user = await User.findById(session.userId)
        if (!user) {
            return res.status(401).json({msg: 'Please Log In'})
        }
        req.user = user
        next()
    } catch(err) {
        console.log('error in loginMiddleware', err)
        res.status(500).json({msg: 'Server Error'})
    }
}
export default loginMiddleware