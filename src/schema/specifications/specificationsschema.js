import mongoose from "mongoose";

const specifications = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,

    },

    parentId: {
        type: String,
    },
    category:{
        type: String,
    },
}, { timestamps: true })

const Specificationsschema = mongoose.model('specifications', specifications)
export default Specificationsschema