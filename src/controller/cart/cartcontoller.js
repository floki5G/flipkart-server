import Cartschema from "../../schema/cart/cartschema.js"
import Productschema from "../../schema/product/productschema.js"


export const cartcontroller = (req, res) => {

  Cartschema.findOne({ user: req.user._id })
    .exec((error, data) => {
      if (data) {

        const product = req.body.cartItem.product;
        const udatecartaitem = data.cartItem.find(c => c.product == product)
        let condition, update;

        if (udatecartaitem) {
          condition = { user: req.user._id, "cartItem.product": product }
          update = {
           $set: {
              "cartItem.$": {
                ...req.body.cartItem,
                quentity:  udatecartaitem.quentity +  req.body.cartItem.quentity
              }
            }
          };
          Cartschema.findOneAndUpdate(condition, update)
            .exec((error, cart) => {
              if (cart) {
      
                res.status(200).json({ cart })
              }
              if (error) {
                res.status(200).json({ message: error })
              }
            })
        } else {
          condition = { user: req.user._id }
          update = {
            $push: { "cartItem": req.body.cartItem }
          };
          Cartschema.findOneAndUpdate(condition, update)
            .exec((error, cart) => {


              if (cart) {
                res.status(200).json({ cart })

              }
              if (error) {
                res.status(200).json({ message: error })
              }
            })
        }
    
      }
      else {
    
        const _cartcontroller = Cartschema({
          user: req.user._id,
          cartItem: req.body.cartItem
        })
        _cartcontroller.save((error, data) => {

          if (data) {
         
            res.status(200).json({ data})

          }
          if (error) {
            res.status(200).json(error)
          }
        })
      }
    })
}


export const getCartItems = async (req, res) => {
 
 await Cartschema.findOne({ user: req.user._id })
    .select('cartItem')
    .populate("cartItem.product", "_id name price productPicture")
    .exec((error, cart) => {
      if (cart) {
        let cartItem = {};
        cart.cartItem.forEach((item, index) => {
          cartItem[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPicture[0].img,
            price: item.product.price,
            qty: item.quentity,
          };

        });
        res.status(200).json({ cartItem });
      }
      if (error) return res.status(500).json({ "message": error });

    });
  //}
};

// new update remove cart items
export const removeCartItems = (req, res) => {

  const { productId } = req.body;
  if (productId) {
    Cartschema.findOneAndUpdate(
      { user: req.user._id },
      {
        $pull: {
          cartItem: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(500).json({ error });
      if (result) {
 
        res.status(200).json({ result });
      }
    });
  }
};