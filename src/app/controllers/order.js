const Order = require("../models/order");
const Cart = require("../models/cart");

exports.addOrder = (req, res) => {
  Cart.deleteOne({ user: req.user._id }).then((response) => {
    if (response) {
      const order = new Order();
      order.user = req.user._id;
      order.totalAmount = req.body.totalAmount;
      order.items = req.body.items;
      order.save().then((data) => {
        res.status(200).json({
          data,
        });
      });
    }
  });
};

// exports.getOrders = (req, res) => {
//   Order.find({ user: req.user._id })
//     .select("_id paymentStatus paymentType orderStatus items")
//     .populate("items.productId", "_id name productPictures")
//     .exec((error, orders) => {
//       if (error) return res.status(400).json({ error });
//       if (orders) {
//         res.status(200).json({ orders });
//       }
//     });
// };

// exports.getOrder = (req, res) => {
//   Order.findOne({ _id: req.body.orderId })
//     .populate("items.productId", "_id name productPictures")
//     .lean()
//     .exec((error, order) => {
//       if (error) return res.status(400).json({ error });
//       if (order) {
//         Address.findOne({
//           user: req.user._id,
//         }).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           order.address = address.address.find(
//             (adr) => adr._id.toString() == order.addressId.toString()
//           );
//           res.status(200).json({
//             order,
//           });
//         });
//       }
//     });
// };
