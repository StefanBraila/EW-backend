import express from 'express'
import loginMiddleware from '../middlewares/loginMiddleware.js'
import dice from '../controllers/dice.js'

const r = express.Router()

r.post('/dice', loginMiddleware, dice)

export default r