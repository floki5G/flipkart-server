import express from 'express';

import { address , getaddress} from '../../controller/address/addresscontroller.js';
import { requireSignin ,userMiddleware} from '../../commom-middleware/index.js';
const addressrouter = express.Router();


addressrouter.post('/user/address',requireSignin,userMiddleware, address)

addressrouter.post('/user/getaddress',requireSignin,userMiddleware, getaddress)



export default addressrouter;