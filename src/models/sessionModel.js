import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  userId: String,
})

const Session = new mongoose.model('Session', sessionSchema)

export default Session