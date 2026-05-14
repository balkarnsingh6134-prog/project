import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { processDeferredProduct, setCartItems } = useCart();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state && location.state.message) {
      // toastId prevents the double-toast by identifying the specific message
      toast.info(location.state.message, {
        toastId: "auth-redirect-message"
      });
      
      // Clear navigation state to prevent re-triggering on refresh
      navigate(location.pathname, { 
        replace: true, 
        state: {} 
      });
    }
  }, [location, navigate]);

  const handleSearch = () => {
    const query = document.getElementById('searchBox')?.value;
    console.log("Searching for:", query);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const response = await axios.post("https://project-tpfa.onrender.com/user/login", data);
      const res = response.data;

      if (res.success === false) {
        toast.error(res.message || "Invalid email or password", { toastId: "err-toast" });
      } else {
        toast.success(res.message || "Login Successful!", { toastId: "success-toast" });

        if (res.token) {
          localStorage.setItem("token", res.token);
        }

        await processDeferredProduct();
        navigate('/Shop', { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);
      const backendMessage = error.response?.data?.message;
      toast.error(backendMessage || "Server error! Please try again later.", { toastId: "server-err" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('cartItems');
    setCartItems([]);
    
    toast.success("Logged out successfully!", { toastId: "logout-toast" });
    navigate('/login', { replace: true });
  };

  return (
    <div>
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
          <Link to="/login">
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" />
          </Link>
          <Link to="/cart">
            <img src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" alt="Cart" title="Cart" />
          </Link>
        </div>
      </div>

      <div className="navbar2">
        <ul id="nav2">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/latest">Latest Products</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>

      <div className="main-auth-background">
        <div className="login-container">
          <div className="card login-card shadow mx-auto">
            <div className="card-header text-center border-0 bg-transparent">
              <h2 className="mb-0">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-check d-flex justify-content-between mt-3">
                  <div>
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div>
                  <Link to="/ForgotPassword" style={{ color: "#ff4b2b" }} className="text-decoration-none small">
                    Forgot password?
                  </Link>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-danger w-100 mb-2">
                    Login
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary w-100 mb-2"
                    onClick={() => navigate("/Signup")}
                  >
                    Create New Account
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger w-100 mb-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
            <p>Delivery</p>
            <p>Legal Notice</p>
            <p>Terms and Conditions</p>
            <p>Secure payment</p>
            <p>Contact Us</p>
            <p>About Us</p>
          </div>
          <div className="footer-col">
            <h3>Products</h3>
            <p>Prices drop</p>
            <p>New products</p>
            <p>Best sellers</p>
            <p>Sitemap</p>
            <p>Stores</p>
            <p>Accessories</p>
          </div>
          <div className="footer-col">
            <h3>Your Account</h3>
            <p>Sign in</p>
            <p>Order Tracking</p>
            <p>Create account</p>
            <p>Credit Slip</p>
            <p>Vouchers</p>
            <p>Wishlist</p>
          </div>
          <div className="footer-col">
            <h3>Our Newsletter</h3>
            <p>Subscribe to our latest newsletter to get news about special discounts.</p>
            <p>
              <input type="email" placeholder="Your email address" style={{ width: "100%", boxSizing: "border-box" }} />
            </p>
            <label style={{ display: 'block', marginTop: '10px' }}>
              <input type="checkbox" /> I agree to the terms and the privacy policy
            </label>
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © Mobishop. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;