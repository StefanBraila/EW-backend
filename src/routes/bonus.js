import express from 'express'
import loginMiddleware from '../middlewares/loginMiddleware.js'
import bonusClaim from '../controllers/bonusClaim.js'
import bonusStatus from '../controllers/bonusStatus.js'

const r = express.Router()

r.post('/bonus/claim', loginMiddleware, bonusClaim)

r.get('/bonus/status', loginMiddleware, bonusStatus)

export default r