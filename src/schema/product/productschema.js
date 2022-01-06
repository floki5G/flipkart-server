import mongoose from "mongoose";

const product = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    slug: {
        type: String,

    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    offers: {
        type: String,
        require: true,
    },
    highlightData: [
       {
            filterhighlight: { type: mongoose.Schema.Types.ObjectId, ref: 'highlight' },
            // highlight_id: { type: mongoose.Schema.Types.ObjectId, ref: 'highlight' },
            // highlightName:{type:String},
            value: { type: Number },
            descriptionfilter: { type: String }
        }

    ],
    specificationData: [
        {
             specificatonId: { type: mongoose.Schema.Types.ObjectId, ref: 'specifications' },
             filterDescription:{type:String}
         }
 
     ],
   
    productPicture: [
        {
            img: { type: String }
        }
    ],
    review: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
            review: String
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'post'
    },
    category:
        { type: mongoose.Schema.Types.ObjectId, ref: 'category', require: true },

    updateDate: Date
}, { timestamps: true })

const Productschema = mongoose.model('product', product)

export default Productschema

