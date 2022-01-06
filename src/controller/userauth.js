import Post_schema from "../schema/post_schema.js"
import jwt from 'jsonwebtoken'

export const signin = (req, res) => {
    Post_schema.findOne({ email: req.body.email })

        .exec((error, user) => {
            if (error) {
                return res.status(500).json({ message: "signin" })
            }
            if (user) {
                if (user.authenticate(req.body.pass) && user.role == "user") {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRATE, { expiresIn: '1d' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullName
                        }
                    })
                }
                else {
                    return res.status(500).json({ message: "invalid pass" })
                }
            } else {
                return res.status(500).json({ message: "someting went wrong" })
            }
        })

}

export const signup = (req, res) => {

    // const posts = Post_schema.findOne({ email: req.body.email })
    // if (posts) {
    //     res.status(400).json({ message: "user already exist" })
    // } 
    const {
        firstName,
        lastName,
        email,
        pass,

    } = req.body;
    const _user = new Post_schema({
        firstName,
        lastName,
        email,
        pass,
        userName: Math.random().toString()
    })
    _user.save((error, data) => {

        if (data) {
            res.status(200).json({ message: data })

        }
        if (error) {
            res.status(200).json(error)

        }
    })
}
