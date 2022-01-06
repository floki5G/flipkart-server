import Post_schema from "../../schema/post_schema.js"
import jwt from 'jsonwebtoken'

export const adminsignin = (req, res) => {

    Post_schema.findOne({ email: req.body.email })

        .exec((error, user) => {
            if (user) {
                if (user.authenticate(req.body.pass) && user.role == "admin") {
                    const token = jwt.sign({ _id: user._id, role: user.role  }, process.env.JWT_SECRATE, { expiresIn: '1d' });
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

export const adminsignup = (req, res) => {

        const {
            firstName,
            lastName,
            email,
            pass,
            role
        } = req.body;
        const _user = new Post_schema({
            firstName,
            lastName,
            email,
            pass,
            role,
            userName: Math.random().toString()
        })
        _user.save((error, data) => {

            if (data) {
                res.status(200).json({ message: data })

            }
            if (error) {
                res.status(200).json("something went wrong")

            }
        })
    }



// only for testing


