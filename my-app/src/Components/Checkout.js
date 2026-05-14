import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../App.css'; 

function Checkout() {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'Credit Card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const query = document.getElementById('searchBox')?.value;
    console.log("Searching for:", query);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!", { position: "top-right" });
      return;
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

    const orderData = {
      ...formData,
      items: cartItems,
      totalAmount: totalAmount
    };

    try {
      const id = toast.loading("Processing your order...", { position: "top-right" });
      const response = await axios.post("http://localhost:5555/orders/place", orderData);

      if (response.data.success) {
        toast.update(id, { 
          render: "Order Placed Successfully! Confirmation mail sent.", 
          type: "success", 
          isLoading: false, 
          autoClose: 5000 
        });

        setCartItems([]);
        localStorage.removeItem('cartItems');
        setTimeout(() => navigate('/Home'), 3000);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to place order. Check if server.js is running.");
      console.error("Order Error:", error);
    }
  };

  return (
    <div className="checkout-wrapper-19">
      {/* NAVBAR 1 */}
      <div className="navbar1">
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/128/644/644458.png" alt="Mobile Icon" />
          <span><span style={{ color: '#06c4dd' }}>Mobile</span> Shop</span>
        </div>
        <div className="search-box">
          <input type="text" id="searchBox" placeholder="Search product" />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="icons">
          <Link to="/login"><img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" /></Link>
          <Link to="/cart"><img src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" alt="Cart" /></Link>
        </div>
      </div>

      {/* NAVBAR 2 */}
      <div className="navbar2">
        <ul id="nav2">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/latest">Latest Products</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>

      <div className="container-19">
        <h1 className="title-19">Checkout</h1>
        <div className="checkout-grid-19">
          
          <form className="form-section-19" onSubmit={handlePlaceOrder}>
            <h3>Shipping Address</h3>
            <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
            <input type="text" name="address" placeholder="Street Address" required onChange={handleChange} />
            
            <div className="flex-inputs-19">
              <input type="text" name="city" placeholder="City" required onChange={handleChange} />
              <input type="text" name="zipCode" placeholder="ZIP Code" required onChange={handleChange} />
            </div>

            <h3 style={{ marginTop: '30px' }}>Payment Method</h3>
            {/* Payment dropdown and button aligned in one row */}
            <div className="payment-method-row-19">
              <select name="paymentMethod" className="dropdown-19" onChange={handleChange}>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>

              <button type="submit" className="place-order-btn-19">
                Place Order
              </button>
            </div>
          </form>

          <div className="summary-section-19">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="summary-item-19">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="total-19">
              <strong>Total:</strong>
              <strong>${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="box10">
        <div className="footer-container">
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p><strong>Mobishop Demo</strong></p>
            <p>99 New Theme St. XY, USA 12345,<br />Beside the Sun point land.</p>
            <p>United States</p>
            <p>Call us: +00 123-456-789</p>
            <p>Email: admin@example.com</p>
          </div>

          <div className="footer-col">
            <h3>Our Company</h3>
            <p>Delivery</p><p>Legal Notice</p><p>Terms and Conditions</p>
            <p>Secure payment</p><p>Contact Us</p><p>About Us</p>
          </div>

          <div className="footer-col">
            <h3>Products</h3>
            <p>Prices drop</p><p>New products</p><p>Best sellers</p>
            <p>Sitemap</p><p>Stores</p><p>Accessories</p>
          </div>

          <div className="footer-col">
            <h3>Your Account</h3>
            <p>Sign in</p><p>Order Tracking</p><p>Create account</p>
            <p>Credit Slip</p><p>Vouchers</p><p>Wishlist</p>
          </div>

          <div className="footer-col">
            <h3>Our Newsletter</h3>
            <p>Subscribe to our latest newsletter to get news about special discounts.</p>
            <input type="email" placeholder="Your email address" style={{ width: "100%", boxSizing: "border-box", padding: "10px", marginBottom: "10px" }} />
            <label style={{ display: 'block', marginTop: '10px' }}>
              <input type="checkbox" /> I agree to the terms and the privacy policy
            </label>
            <button className="subscribe-btn" style={{ marginTop: '10px' }}>Subscribe</button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © Mobishop. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;