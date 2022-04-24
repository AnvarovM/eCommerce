import React, { useRef } from "react";
import {
  AiOutlineLeft,
  AiOutlineHeart 
} from "react-icons/ai";
import { TiOutlineDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import Link from "next/link";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const Like = () => {
  const LikeRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    likeItems,
    setShowLike,
    showLike,
  } = useStateContext();

  return (
    <div
      className="cart-wrapper"
      ref={LikeRef}
    >
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowLike(!showLike)}
          ref={LikeRef}
        >
          <AiOutlineLeft />
          <span className="heading">Your Like List</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {likeItems.length < 1 && (
        <div className="like-cart">
          <AiOutlineHeart size={100} />
          <h3>Your like list is empty</h3>
          <Link href="/">
            <button
              type="button"
              className="btn"
              onClick={() => setShowLike(!showLike)}
            >
              Continue Like
            </button>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default Like;
