import React from 'react';
import { Link } from 'react-router-dom';
const Oneplus = () => {
  // Function for the search button
  const handleSearch = () => {
    const query = document.getElementById('searchBox').value;
    console.log("Searching for:", query);
  };

  // Function for the Add to Cart buttons
  const addToCart = (phoneName) => {
    alert(`${phoneName} has been added to your cart!`);
  };

  return (
    <div>
      {/* Document Metadata */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mobile Shop - OnePlus</title>
      <link rel="stylesheet" href="mobile.css" />

      {/* NAVBAR 1 */}
      <div className="navbar1">
        {/* LEFT: Logo */}
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/128/644/644458.png" alt="Mobile Icon" />
          <span><span style={{ color: '#06c4dd' }}>Mobile</span> Shop</span>
        </div>

        {/* SEARCH BOX */}
        <div className="search-box">
          <input type="text" id="searchBox" placeholder="Search product" />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* RIGHT: Icons */}
        <div className="icons">
         <Link to="/login">
                               <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="Account" />
                             </Link>
                                        {/* Don't forget to import { Link } from 'react-router-dom' at the top! */}
                             <Link to="/cart">
                               <img src="https://cdn-icons-png.flaticon.com/128/10485/10485973.png" alt="Cart" title="Cart" />
                             </Link>
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

      {/* PRODUCT GRID SECTION */}
      <h2 className="special">OnePlus Phones</h2>
      <div className="container15">
  {/* BOX 1 */}
  <div className="box15">
    <div className="img-wrapper">
      <img src="https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg" alt="OnePlus 11" />
    </div>
    <div className="content15">
      <h3>OnePlus 11<br />5G Titan Black</h3>
      <div className="market-prices">
        <span>Amazon: <s className="high">$750</s></span>
        <span>Flipkart: <s className="high">$730</s></span>
      </div>
      <p><span className="new-price">$699</span></p>
      <button className="cart-btn15">Add to Cart</button>
    </div>
  </div>

  {/* BOX 2 */}
  <div className="box15">
    <div className="img-wrapper">
      <img src="https://tse2.mm.bing.net/th/id/OIP.8KSt5jvlMnIWZsexnhYl_QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="OnePlus Nord CE 3" />
    </div>
    <div className="content15">
      <h3>OnePlus Nord CE 3<br />8GB RAM 128GB</h3>
      <div className="market-prices">
        <span>Amazon: <s className="high">$380</s></span>
        <span>Flipkart: <s className="high">$365</s></span>
      </div>
      <p><span className="new-price">$349</span></p>
      <button className="cart-btn15">Add to Cart</button>
    </div>
  </div>

  {/* BOX 3 */}
  <div className="box15">
    <div className="img-wrapper">
      <img src="https://oasis.opstatics.com/content/dam/oasis/page/2022/operation/may/karen/Karen-Green-540x540-L.png" alt="OnePlus Nord 2T" />
    </div>
    <div className="content15">
      <h3>OnePlus Nord 2T<br />Jade Fog 128GB</h3>
      <div className="market-prices">
        <span>Amazon: <s className="high">$430</s></span>
        <span>Flipkart: <s className="high">$415</s></span>
      </div>
      <p><span className="new-price">$399</span></p>
      <button className="cart-btn15">Add to Cart</button>
    </div>
  </div>

  {/* BOX 4 */}
  <div className="box15">
    <div className="img-wrapper">
      <img src="https://tse4.mm.bing.net/th/id/OIP.2QfS0Edm5DfbWy69GxeIeAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="OnePlus 10T" />
    </div>
    <div className="content15">
      <h3>OnePlus 10T<br />Moonstone Black</h3>
      <div className="market-prices">
        <span>Amazon: <s className="high">$650</s></span>
        <span>Flipkart: <s className="high">$630</s></span>
      </div>
      <p><span className="new-price">$599</span></p>
      <button className="cart-btn15">Add to Cart</button>
    </div>
  </div>

  {/* BOX 5 */}
  <div className="box15">
    <div className="img-wrapper">
      <img src="https://tse3.mm.bing.net/th/id/OIP.4tNgYyuTlQ3ojpLbQqEUfgHaIN?rs=1&pid=ImgDetMain&o=7&rm=3" alt="OnePlus 10 Pro" />
    </div>
    <div className="content15">
      <h3>OnePlus 10 Pro<br />Volcanic Black</h3>
      <div className="market-prices">
        <span>Amazon: <s className="high">$850</s></span>
        <span>Flipkart: <s className="high">$820</s></span>
      </div>
      <p><span className="new-price">$799</span></p>
      <button className="cart-btn15">Add to Cart</button>
    </div>
  </div>

  {/* BOX 6 */}
  <div className="box15">
    <div className="img-wrapper">
      <img src="https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-9-pro-1.jpg" alt="OnePlus 9 Pro" />
    </div>
    <div className="content15">
      <h3>OnePlus 9 Pro<br />Morning Mist</h3>
      <div className="market-prices">
        <span>Amazon: <s className="high">$740</s></span>
        <span>Flipkart: <s className="high">$720</s></span>
      </div>
      <p><span className="new-price">$699</span></p>
      <button className="cart-btn15">Add to Cart</button>
    </div>
  </div>

  {/* BOX 7 */}
  <div className="box15">
    <div className="img-wrapper">
      <img src="https://oasis.opstatics.com/content/dam/oasis/page/2021/9-series/spec-image/9/Arcticsky_9.png" alt="OnePlus 9" />
    </div>
    <div className="content15">
      <h3>OnePlus 9<br />Arctic Sky</h3>
      <div className="market-prices">
        <span>Amazon: <s className="high">$640</s></span>
        <span>Flipkart: <s className="high">$620</s></span>
      </div>
      <p><span className="new-price">$599</span></p>
      <button className="cart-btn15">Add to Cart</button>
    </div>
  </div>

  {/* BOX 8 */}
  <div className="box15">
    <div className="img-wrapper">
      <img src="https://oasis.opstatics.com/content/dam/oasis/default/product-specs/8t-green.png" alt="OnePlus 8T" />
    </div>
    <div className="content15">
      <h3>OnePlus 8T<br />Aquamarine Green</h3>
      <div className="market-prices">
        <span>Amazon: <s className="high">$550</s></span>
        <span>Flipkart: <s className="high">$530</s></span>
      </div>
      <p><span className="new-price">$499</span></p>
      <button className="cart-btn15">Add to Cart</button>
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
            <input type="email" placeholder="Your email address" />
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
};

export default Oneplus;