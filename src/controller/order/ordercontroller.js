import Cartschema from "../../schema/cart/cartschema.js"
import Addressschema from "../../schema/address/addressschema.js"
import Orderschema from "../../schema/order/ordreschema.js"

export const addOrder = (req, res) => {
    Cartschema.deleteOne({ user: req.user._id }).exec((error, result) => {
    if (error) return res.status(500).json({ error });
    if (result) {
      req.body.user = req.user._id;
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];
      const order = new Orderschema(req.body);
      order.save((error, order) => {
        if (error) return res.status(500).json({ error });
        if (order) {
          res.status(200).json({ order });
        }
      });
    }
  });
};
export const getOrders = (req, res) => {
    Orderschema.find({ user: req.user._id })
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(500).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

export const getOrder = (req, res) => {
    Orderschema.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
      if (error) return res.status(500).json({ error });
      if (order) {
        Addressschema.findOne({
          user: req.user._id,
        }).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          Orderschema.address = address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
};