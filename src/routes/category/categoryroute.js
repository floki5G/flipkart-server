import express from 'express';
import { categorycontoller, getallCategory, deleteCaterory ,updateCaterory} from '../../controller/category/categorycontroller.js';
import { requireSignin, adminMiddleware } from '../../commom-middleware/index.js';
import { upload } from '../../commom-middleware/index.js';
const category = express.Router();

category.post('/admin/category/createcatagory',upload.array("categoryPicture"),requireSignin, adminMiddleware, categorycontoller)
category.post('/admin/category/deleteCaterory', deleteCaterory)
category.post('/admin/category/updateCaterory', updateCaterory)
category.post('/admin/category/getallcatagory', getallCategory)


export default category