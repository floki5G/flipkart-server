import mongoose from 'mongoose'

const ctschema = new mongoose.Schema({
    name: {
        type: String,
        unique:true,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique:true,
        required: true,
      
    },
    categoryPicture: [
        {
            img: { type: String }
        }
    ],
    parentId: {
        type: String,
    },
    pagetype: {
        type: String,
    }

}, { timestamps: true })

const Categoryschema = mongoose.model('category', ctschema)

export default Categoryschema