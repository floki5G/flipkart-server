import express from 'express';
import { cartcontroller ,getCartItems,removeCartItems} from '../../controller/cart/cartcontoller.js';
import { requireSignin ,userMiddleware} from '../../commom-middleware/index.js';
const cartrouter = express.Router();


cartrouter.post('/user/cart',requireSignin,userMiddleware, cartcontroller)

cartrouter.post('/user/getCartItems',requireSignin,userMiddleware, getCartItems)

cartrouter.post('/user/removeCartItems',requireSignin,userMiddleware, removeCartItems)


export default cartrouter;