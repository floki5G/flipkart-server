import express from 'express';
import { adminsignin,adminsignup } from '../../controller/admin/adminauth.js';
import { validatior,validatiorReq } from '../../validator/validator.js';
const adminrouter = express.Router();


adminrouter.post('/admin/adminsignin', adminsignin)

adminrouter.post('/admin/adminsignup',validatior,validatiorReq,adminsignup)
 
// router.post('/profile', profile, (req,res)=>res.status(200).json({message:"profile"}))

export default adminrouter;