import Addressschema from "../../schema/address/addressschema.js";


export const address = (req, res) => {

console.log(req.body)

    const { name, mobileNumber, pinCode, locality, address, cityDistrictTown, state, landmark, alternatePhone, addressType } = req.body


    const addressdata = {
        name: name,
        mobileNumber: mobileNumber,
        pinCode: pinCode,
        locality: locality,
        address: address,
        cityDistrictTown: cityDistrictTown,
        state: state,
        landmark: landmark,
        alternatePhone: alternatePhone,
        addressType: addressType
    }


    Addressschema.findOne({ user: req.user._id })
        .exec((error, data) => {
            let condition, update;
            if (data) {
                condition = { user: req.user._id }
                update = {
                    $push: {
                        "address": [addressdata]
                    }
                };
                Addressschema.findOneAndUpdate(condition, update)
                    .exec((error, data) => {
                        if (data) {
                            res.status(200).json({ data })
                        }
                        if (error) {
                            res.status(500).json({ message: "error" })

                        }
                    })

            }
            else {

                const _address = Addressschema({
                    user: req.body.user,
                    address: [addressdata]
                })
                _address.save((error, data) => {
                    if (data) {
                        res.status(200).json({ data })
                    }
                    else {
                        res.status(500).json({ message: "something went wrong in newa address" })

                    }
                })

            }


        })



}




export const getaddress = (req, res) => {

    Addressschema.findOne({ user: req.user._id })
        .exec((error, address) => {
            if (address) {

                res.status(200).json({ address });
            }
            if (error) return res.status(500).json({ message: "getaddress error" });

        });


}









// console.log(item.name)

