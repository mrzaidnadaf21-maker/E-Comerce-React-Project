import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import OrderSummary from "../OrderSummary/OrderSummary";
import OrderPlace from "../OderPlace/OrderPlace";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  const [cart, setCart] = useState(() => {
    const storeCart = localStorage.getItem("cart");
    return storeCart ? JSON.parse(storeCart) : [];
  });
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Wishlist
  const [wishList, setWishList] = useState(() => {
    const storeWishlist = localStorage.getItem("wishlist");
    return storeWishlist ? JSON.parse(storeWishlist) : [];
  });

  //Total calculation
  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // red span increment
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // shiping Total
  const shippingFee = totalItems * 2;

  // order total
  const orderTotal = subTotal + shippingFee;

  // Navbar scrolling amination
  useEffect(() => {
    const changeNavbar = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", changeNavbar);
  }, []);

  // save items to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [cart, wishList]);

  // handle scroll
  const handleScroll = () => {
    const section = document.getElementById("product-section");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // cart and wishlist showpanel function
  const handlePanel = (tabName) => {
    setActivePanel((prev) => (prev === tabName ? null : tabName));
  };

  // ClosePanel function
  const handleClose = () => setActivePanel(null);

  // removeItem
  const removeItem = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  //  quantity Increment
  const quantityIncrement = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // decrement quantity
  const quantityDecrement = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Add to Cart Function
  const addToCart = (product) => {
    const alreadyAdded = cart.find((item) => item.id === product.id);
    if (alreadyAdded) {
      alert("Item is alreay in the cart");
      return;
    }
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  //wishlist logic function
  const addToWishList = (product) => {
    const isInWishlist = wishList.some((item) => item.id === product.id);

    if (isInWishlist) {
      setWishList(wishList.filter((item) => item.id !== product.id));
    } else {
      const addDate = new Date().toLocaleDateString("en-GB");
      setWishList([...wishList, { ...product, addDate }]);
    }
  };

  // clear Wihslist function
  const clearWishlist = () => {
    setWishList([]);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar
        handleScroll={handleScroll}
        setSearchTerm={setSearchTerm}
        isScrolled={isScrolled}
        handlePanel={handlePanel}
        totalItems={totalItems}
        wishList={wishList}
      />

      {/* banner */}
      <Banner />

      {/* product */}
      <Products
        searchTerm={searchTerm}
        addToCart={addToCart}
        addToWishList={addToWishList}
        wishList={wishList}
      />

      {/* cart */}
      <Cart
        activePanel={activePanel}
        handleClose={handleClose}
        cart={cart}
        removeItem={removeItem}
        quantityIncrement={quantityIncrement}
        quantityDecrement={quantityDecrement}
        subTotal={subTotal}
        shippingFee={shippingFee}
        orderTotal={orderTotal}
        setOrderSummary={setOrderSummary}
      />

      {/* wishlist */}
      <Wishlist
        activePanel={activePanel}
        handleClose={handleClose}
        wishList={wishList}
        addToCart={addToCart}
        clearWishlist={clearWishlist}
      />

      {/* ordersummary */}
      {orderSummary && (
        <OrderSummary
          cart={cart}
          subTotal={subTotal}
          shippingFee={shippingFee}
          orderTotal={orderTotal}
          setOrderPlaced={setOrderPlaced}
          setOrderSummary={setOrderSummary}
          setCart={setCart}
        />
      )}

      {/* order placed */}
      {orderPlaced && <OrderPlace setOrderPlaced={setOrderPlaced} />}
    </div>
  );
};

export default Home;
