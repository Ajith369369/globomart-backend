const carts = require("../models/cartModel");

// add item
exports.addToCartController = async (req, res) => {
  const {
    id,
    title,
    description,
    price,
    category,
    image,
    rating,
    quantity,
    grandTotal,
  } = req.body;

  // userId could be obtained from token
  const userId = req.payload;

  try {
    const existingProduct = await carts.findOne({ id, userId });
    if (existingProduct) {
      res.status(406).json("Product is already there in your cart.");
    } else {
      const newProduct = new carts({
        id,
        title,
        description,
        price,
        category,
        image,
        rating,
        quantity: 1,
        grandTotal: price,
        userId,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// get item
exports.allCartItemController = async (req, res) => {
  console.log("Inside allCartItemController.");
  // userId could be obtained from token
  const userId = req.payload;
  try {
    const allProduct = await carts.find({ userId });
    res.status(200).json(allProduct);
  } catch (error) {
    res.status(401).json(error);
  }
};

// remove item
exports.removeItemFromCartController = async (req, res) => {
  const { id } = req.params;
  try {
    await carts.findByIdAndDelete({ _id: id });
    // await carts.deleteOne({ _id: id });
    res.status(200).json("Deleted successfully!");
  } catch (error) {
    res.status(401).json(error);
  }
};

// empty cart
exports.emptyCartController = async (req, res) => {
  const userId = req.payload;
  try {
    await carts.deleteMany({ userId });
    res.status(200).json("Deleted cart successfully!");
  } catch (error) {
    res.status(401).json(error);
  }
};

// increment cart item
exports.incrementController = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedItem = await carts.findOne({ _id: id });
    if (selectedItem) {
      selectedItem.quantity += 1;
      selectedItem.grandTotal = selectedItem.quantity * selectedItem.price;

      await selectedItem.save();
      res.status(200).json(selectedItem);
    } else {
      res.status(406).json("No such product.");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// decrement cart item
exports.decrementController = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedItem = await carts.findOne({ _id: id });
    if (selectedItem) {
      selectedItem.quantity -= 1;
      if (selectedItem.quantity == 0) {
        await carts.deleteOne({ _id: id });
        res.status(200).json("Deleted.");
      } else {
        selectedItem.grandTotal = selectedItem.quantity * selectedItem.price;
        await selectedItem.save();
        res.status(200).json(selectedItem);
      }
    } else {
      res.status(406).json("No such product.");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
