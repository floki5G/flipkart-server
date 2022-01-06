import mongoose from 'mongoose'

const newpage = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    banners: [
        {
            img: { type: String },
            // navigateTo: { type: String }
        }
    ],
    products: [
        {
            img: { type: String },
            // navigateTo: { type: String }
        }
    ],
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category', 
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
      
    }
}, { timestamps: true });


const NewpageSchema= mongoose.model('newpage', newpage);
export default NewpageSchema