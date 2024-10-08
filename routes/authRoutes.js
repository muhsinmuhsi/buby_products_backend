import express from 'express'
import { register,login } from '../Controllers/authenticationcontroller.js';
const route=express.Router();
import uploadImage from '../middelwares/uploadmiddelware.js';

route.post('/register',uploadImage,register)
route.post('/login',login)

export default route;