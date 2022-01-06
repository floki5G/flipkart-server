import express from 'express';
import env from 'dotenv'
import cors from 'cors'
import Connection from './database/db.js';
import router from './routes/route.js';
import adminrouter from './routes/admin/adminroute.js'
import category from './routes/category/categoryroute.js';
import productrouter from './routes/product/productroute.js';
import cartrouter from './routes/cart/cartroute.js';
import newpagerouter from './routes/newpage/newpagerouter.js';
import highlight from './routes/highlight/highlightroute.js';
import path from 'path';
import specification from './routes/specification/specifictionroute.js';
import addressrouter from './routes/address/addressrouter.js';
import orderrouter from './routes/order/orderroutes.js'
// envernoment variable
const app = express();

env.config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())
app.use(express.json())
app.use("/public", express.static((path.join(path.dirname('/a/flipkart/server/src'), '/src/upload'))));
app.use('/api', router)
app.use('/api', adminrouter)
app.use('/api', category)
app.use('/api', productrouter)
app.use('/api', cartrouter)
app.use('/api', newpagerouter)
app.use('/api', highlight)
app.use('/api', specification)
app.use('/api', addressrouter)
app.use('/api', orderrouter)

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ${process.env.PORT}`)
})

Connection()