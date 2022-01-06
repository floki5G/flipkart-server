import express from "express";
import { newpagecontroller, getallnewpage, getnepagebycat } from "../../controller/newpage/newpagecontroller.js";
import { upload, requireSignin, adminMiddleware } from '../../commom-middleware/index.js'




const newpagerouter = express.Router();

newpagerouter.post("/admin/newpage", upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), requireSignin, adminMiddleware, newpagecontroller)

newpagerouter.post("/admin/getallnewpage", getallnewpage)

newpagerouter.post("/user/getnepagebycat/:cid/:pagetype", getnepagebycat)

export default newpagerouter