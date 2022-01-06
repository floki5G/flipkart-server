import express from 'express';
import { signin,signup} from '../controller/userauth.js';
import { validatior,validatiorReq} from '../validator/validator.js';
const router = express.Router();


router.post('/signin', signin)

router.post('/signup',validatior,validatiorReq,signup)
 
// router.post('/profile', profile, (req,res)=>res.status(200).json({message:"profile"}))

export default router;