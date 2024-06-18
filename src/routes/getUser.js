import express from 'express';
import getUser from '../controllers/getUser.js';
import loginMiddleware from '../middlewares/loginMiddleware.js';

const r = express.Router();

r.get('/get-user', loginMiddleware, getUser);

export default r;