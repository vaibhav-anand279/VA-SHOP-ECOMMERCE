import express from "express";
import db from "../db.js";


const router = express.Router();


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Not authenticated" });
}

//  Get all cart items for current user
router.get("/carts", isAuthenticated, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not logged in" });
  }
  const userId = req.user.id;
  try {
    const result = await db.query(
      `SELECT 
         realproducts.id AS product_id,
         realproducts.name,
         realproducts.image,
         realproducts.price
       FROM cart_items
       JOIN realproducts ON cart_items.product_id = realproducts.id
       WHERE cart_items.user_id = $1`,
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to load cart", error: err });
  }
});

//  Add a product to cart
router.post("/add-cart", isAuthenticated, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    await db.query(
      `INSERT INTO cart_items (user_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [userId, productId]
    );
    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err });
  }
});

//  Remove an item from cart
router.delete("/remove-cart", isAuthenticated, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    await db.query(
      `DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2`,
      [userId, productId]
    );
    res.status(200).json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err });
  }
});


router.delete("/clear", isAuthenticated, async (req, res) => {
  const userId = req.user.id;

  try {
    await db.query(
      `DELETE FROM cart_items WHERE user_id = $1`,
      [userId]
    );
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart", error: err });
  }
});

export default router;