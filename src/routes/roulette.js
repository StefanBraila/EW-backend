import express from 'express'
import loginMiddleware from '../middlewares/loginMiddleware.js'
import roulette from '../controllers/roulette.js'

const r = express.Router()

r.post('/roulette', loginMiddleware, roulette)

export default r