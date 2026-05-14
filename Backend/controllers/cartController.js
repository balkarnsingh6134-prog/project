import Cart from '../model/cartSchema.js';

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { name, price, quantity, category, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Missing required fields: name and price" });
    }

    const existingItem = await Cart.findOne({ name });

    if (existingItem) {
      existingItem.quantity += (quantity || 1);
      const updatedItem = await existingItem.save();
      return res.status(200).json({ message: "Quantity updated", data: updatedItem });
    }

    const newItem = new Cart({
      name,
      price,
      quantity: quantity || 1,
      category,
      image
    });

    const savedItem = await newItem.save();
    res.status(201).json({ message: "Product added to cart", data: savedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all items in the cart
export const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    
    // Attempt to delete using standard mongoose _id
    let deletedItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedItem) {
      // Fallback: search by custom string identifier if _id does not match
      deletedItem = await Cart.findOneAndDelete({ _id: itemId });
    }

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product removed from cart", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default {
  addToCart,
  getCartItems,
  removeFromCart
};