import mongoose from 'mongoose'

const bjSchema = new mongoose.Schema({
  dealer: [],
  player: [],
  player1: [],
  player2: [],
  insurance: {type: Boolean, default: false},
  betAmount: Number,
  activeHand: {type: Number, default: 1},
})

const Bj = new mongoose.model('bj', bjSchema)

export default Bj