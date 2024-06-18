import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    balance: {
        type: Number,
        default: 100
    },
    lvl: {
        type: Number,
        default: 0
    },
    exp: {
        type: Number,
        default: 0
    },
    bj: {
        type: String,
        default: ''
    },
    bonus: {
        type: Number,
    }
},
    { timestamps: true }
)
const User = new mongoose.model('User', userSchema)
export default User