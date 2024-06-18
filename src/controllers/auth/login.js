import User from '../../models/userModel.js'
import Session from '../../models/sessionModel.js'
import bcrypt from 'bcrypt'

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please provide username and password' })
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }
        const session = await Session.create({userId: user._id})
        res.cookie('id', session._id, {
            maxAge: 1000 * 60 * 60 * 24,
        })
        res.status(200).json({ username: user.username, balance: user.balance, lvl: user.lvl, exp: user.exp })
    } catch(err) {
        console.log('error in login controller', err)
        res.status(500).json({msg: 'Server Error'})
    }
}
export default login