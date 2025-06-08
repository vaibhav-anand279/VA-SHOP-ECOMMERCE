// backend/routes/Payment.js or wherever you're handling payments
import express from "express";
import Stripe from "stripe";
 
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Cart Purchase",
            },
            unit_amount: amount * 100, // amount in paise (₹500 => 50000)
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/success", // frontend redirect
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error", err);
    res.status(500).json({ error: "Checkout session failed" });
  }
});

export default router;
