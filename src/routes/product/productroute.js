import express from 'express';
import { productcontroller, getallproduct, updateproduct, getproductbyslug,getproductbyfilterslug ,getproductdetailbyslug} from "../../controller/product/productcontroller.js";
import multer from 'multer'
import path from 'path'
import shortid from 'shortid';
import { adminMiddleware, requireSignin } from '../../commom-middleware/index.js';

const productrouter = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, (path.join(path.dirname('/a/flipkart/server/src'), '/src/upload')))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

productrouter.post('/admin/product/getallproduct', getallproduct)
productrouter.post('/admin/product/updateproduct', upload.array('productPicture'), requireSignin, adminMiddleware, updateproduct)
productrouter.post('/admin/product/createproduct', upload.array('productPicture'), productcontroller)

productrouter.post("/user/product/getproductbyslug/:slug", getproductbyslug)
productrouter.post("/user/product/getproductbyfilterslug/:slug/:cid", getproductbyfilterslug)

productrouter.post("/user/product/getproductdetailbyslug/:slug/:productid/productdetail", getproductdetailbyslug)

export default productrouter