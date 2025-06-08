import express from "express"
import { getOneProduct,getProduct,postProduct,deleteProduct } from "../controllers/productcontrollers.js";
import { isAdmin } from "../middleware/authMiddleware.js";
const router=express.Router();

router.get("/products",getProduct);
router.get("/products/:id",getOneProduct);
router.post("/postproducts",isAdmin,postProduct);

router.delete("/products/:id",deleteProduct);
export default router;
