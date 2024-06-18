import express from 'express';
import register from '../controllers/auth/register.js';
import login from '../controllers/auth/login.js';
import logout from '../controllers/auth/logout.js'

const r = express.Router();

r.post('/register', register);

r.post('/login', login)

r.post('/logout', logout)

export default r;