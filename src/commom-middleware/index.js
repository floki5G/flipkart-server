import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import shortid from 'shortid';
// REQUIRE SIGIN 
export const requireSignin = (req, res, next) => {
    if (req) {

        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRATE)
        req.user = user
    }
    else{
        return res.status(500).json({ message: "authorization req" });
    }
    next()

}

// ADMIN AUTHORIZATION 
export const adminMiddleware = (req, res, next) => {

    if (req.user.role !== 'admin') {
        return res.status(500).json({ message: "admin access denied" });
    }
    next()
}



// user AUTHOROZATION 
export const userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(500).json({ message: "user access denied" });
    }
    next()
}


// upload IMAGE 
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,(path.join(path.dirname('/a/flipkart/server/src'), '/src/upload')))    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
  export  const upload = multer({ storage })