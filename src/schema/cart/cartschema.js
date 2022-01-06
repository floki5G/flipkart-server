import mongoose from 'mongoose'

const _cartschema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'post', require: true },
    cartItem: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'product', require: true
        },
        quentity: {
            type: Number,
            default: 1

        },
        price: {
            type: Number,
            require: true
        }
    }
    ]

}, { timestamps: true })

const Cartschema = mongoose.model('cart', _cartschema)
export default Cartschema