// import express
const express = require("express");

const productController = require("./controllers/productController");

const userController = require("./controllers/userController");

// import jwt
const jwt = require("./jwtMiddleware");

const wishlistController = require("./controllers/wishlistController");

const cartController = require("./controllers/cartController");

const router = new express.Router();

router.get("/all-product", productController.allProductController);

// path to get particular item
router.get("/view-product/:id", productController.getAProductController);

// path to registration
router.post("/register", userController.registerController);

// path to login
router.post("/login", userController.loginController);

// path to add item to wishlist
router.post(
  "/add-wishitem",
  jwt,
  wishlistController.addItemToWishlistController
);

// path to get all wishlist items
router.get(
  "/all-wishlistItems",
  jwt,
  wishlistController.getItemFromWishlistController
);

// path to remove a wishlist item
router.delete(
  "/delete-wishlistItem/:id",
  wishlistController.removeItemFromWishlistController
);

// path to add item to cart
router.post("/add-cart", jwt, cartController.addToCartController);

// #region Multi-line Comment
/**
 * path to get all cart items.
 */
// #endregion
router.get("/all-cartItem", jwt, cartController.allCartItemController);

/**
 * path to delete an item from the cart
 */
router.delete(
  "/delete-cartItem/:id",
  cartController.removeItemFromCartController
);

/**
 * path to empty the cart
 */
router.delete("/empty-cart", jwt, cartController.emptyCartController);

/**
 * path to increment a cart item
 */
router.get("/increment-cartitem/:id", cartController.incrementController);

/**
 * path to decrement a cart item
 */
router.get("/decrement-cartitem/:id", cartController.decrementController);

// export router
module.exports = router;
