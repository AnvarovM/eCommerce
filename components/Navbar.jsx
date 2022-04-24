import React from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineHeart } from "react-icons/ai";
import { Cart } from "./";
import { Like } from "./";

import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, showLike, setShowLike, totalQuantity } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Voila :) Store</Link>
      </p>
      <div className="navbar-icons">
        <button type="button" className="cart-icon" onClick={() => setShowLike(!showLike)}>
          <AiOutlineHeart />
          <span className="cart-item-qty">0</span>
        </button>
        <button type="button" className="cart-icon" onClick={() => setShowCart(!showCart)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantity}</span>
        </button>
      </div>

      {showLike && <Like />}
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
