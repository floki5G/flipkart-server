import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const post_schema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 2,
        max: 20
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 2,
        max: 20
    },
    userName: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },
    contectNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }


}, { timestamp: true })
post_schema.virtual('pass')
    .set(function (pass) {
        this.password = bcrypt.hashSync(pass, 10)
    })
post_schema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })
post_schema.methods = {
    authenticate: function(pass) {
        return bcrypt.compareSync(pass, this.password)
    }
}
const Post_schema = mongoose.model('post', post_schema)

export default Post_schema