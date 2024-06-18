import User from '../../models/userModel.js'
import Session from '../../models/sessionModel.js'
import bcrypt from 'bcrypt'

const register = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please provide username and password' })
        }
        if (await User.findOne({ username })) {
            return res.status(400).json({ msg: 'Username already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, password: hashedPassword, bonus: Date.now() })
        const session = await Session.create({userId: user._id})
        res.cookie('id', session._id, {
            maxAge: 1000 * 60 * 60 * 24,
        })
        res.status(201).json({ username: user.username, balance: user.balance, lvl: user.lvl, exp: user.exp })
    } catch(err) {
        console.log('error in register controller', err)
        res.status(500).json({msg: 'Server Error'})
    }
}

export default register