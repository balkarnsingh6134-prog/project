import express from "express";
import {
    addProduct,
    getAllProducts,
    removeProduct,
    updateProduct,
    getCartItems,
    removeFromCart,
} from "../controllers/productController.js";

import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/allproducts", getAllProducts);                   
router.get("/cart/:userId", getCartItems);                    

router.post("/add", authenticateToken, addProduct);                          
router.delete("/removeproduct/:id", authenticateToken, removeProduct);       
router.put("/update/:id", authenticateToken, updateProduct);                 
router.delete("/cart/remove/:id", authenticateToken, removeFromCart);        

export default router;