import path from 'path';
import { fileURLToPath } from 'url';
import serveStatic from 'serve-static';
import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.js'
import getUserRouter from './routes/getUser.js'
import bjRouter from './routes/bj.js'
import diceRouter from './routes/dice.js'
import bonusRouter from './routes/bonus.js'
import rouletteRouter from './routes/roulette.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

app.use(express.json())
app.use(cookieParser())
app.use('/api', authRouter)
app.use('/api', getUserRouter)
app.use('/api', bjRouter)
app.use('/api', diceRouter)
app.use('/api', bonusRouter)
app.use('/api', rouletteRouter)


app.listen(3000, () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
    }
})