import express from 'express';

import { specificationcontoller,getallspecification} from '../../controller/specifications/specificationcontroller.js';


const specification = express.Router();

specification.post('/admin/specification/specificationcontoller', specificationcontoller)

specification.post('/admin/specification/getallspecification', getallspecification)

export default specification
