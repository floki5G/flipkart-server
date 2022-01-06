import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  mobileNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  pinCode: {
    type: Number,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  cityDistrictTown: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    min: 10,
    max: 100,
  },
  alternatePhone: {
    type: Number,
  },
  addressType: {
    type: String,
    required: true,
    enum: ["home", "work"],
    required: true,
  },
});

const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "post",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);



const Addressschema = mongoose.model('useraddress', userAddressSchema)
export default Addressschema