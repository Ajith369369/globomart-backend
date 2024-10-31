const wishes = require("../models/wishlistModel");

// add item
exports.addItemToWishlistController = async (req, res) => {
  console.log("Inside addItemToWishlistController.");
  const {
    id,
    title,
    description,
    price,
    category,
    image,
    rating,
  } = req.body;

  // userId could be obtained from token
  const userId = req.payload;
  try {
    const existingProduct = await wishes.findOne({ id, userId });
    if (existingProduct) {
      res.status(406).json("Product is already there in your wishlist.");
    } else {
      const newProduct = new wishes({
        id,
        title,
        description,
        price,
        category,
        image,
        rating,
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
exports.getItemFromWishlistController = async (req, res) => {
  console.log("Inside getItemFromWishlistController.");
  // userId could be obtained from token
  const userId = req.payload;
  try {
    const allProducts = await wishes.find({ userId });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(401).json(error);
  }
};

// remove item
exports.removeItemFromWishlistController = async (req, res) => {
  const { id } = req.params;
  try {
    await wishes.findByIdAndDelete({ _id: id });
    res.status(200).json("Deleted successfully!");
  } catch (error) {
    res.status(401).json(error);
  }
};
