import express from 'express';


import { highlightcontroller, getallhighlight,gethighlightbyparentid } from "../../controller/highlight/highlightcontroller.js";

const highlight = express.Router();

highlight.post('/admin/highlight/highlightcontroller', highlightcontroller)

highlight.post('/admin/highlight/getallhighlight/:parentid', gethighlightbyparentid)

highlight.post('/admin/highlight/getallhighlight', getallhighlight)


export default highlight
