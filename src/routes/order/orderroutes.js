import express from 'express';
import { requireSignin,userMiddleware} from '../../commom-middleware/index.js';
 import { addOrder } from '../../controller/order/ordercontroller.js';
const orderrouter = express.Router();


orderrouter.post('/user/addOrder',requireSignin,userMiddleware, addOrder)


export default orderrouter;