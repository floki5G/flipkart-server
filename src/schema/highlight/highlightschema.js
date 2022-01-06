import mongoose from 'mongoose'

const highlight = new mongoose.Schema({

    name: {
        type: String,
    },
    slug: {
        type: String,
        unique:true,
        // required: true,
    },
    parentId:{
        type: String,
    },
    category:{
        type: String,
    },
})

const Highlightschema = mongoose.model("highlight", highlight)
export default Highlightschema