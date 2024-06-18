import express from 'express'
import loginMiddleware from '../middlewares/loginMiddleware.js'
import bjBet from '../controllers/bj/bjBet.js'
import bjHit from '../controllers/bj/bjHit.js'
import bjStand from '../controllers/bj/bjStand.js'
import bjSplit from '../controllers/bj/bjSplit.js'
import bjDouble from '../controllers/bj/bjDouble.js'
import bjGet from '../controllers/bj/bjGet.js'
import bjInsurance from '../controllers/bj/bjInsurance.js'

const r = express.Router()

r.post('/bj/bet', loginMiddleware, bjBet)

r.post('/bj/hit', loginMiddleware, bjHit)

r.post('/bj/stand', loginMiddleware, bjStand)

r.post('/bj/split', loginMiddleware, bjSplit)

r.post('/bj/double', loginMiddleware, bjDouble)

r.post('/bj/Insurance', loginMiddleware, bjInsurance)

r.get ('/bj/get', loginMiddleware, bjGet)

export default r