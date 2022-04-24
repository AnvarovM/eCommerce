import React from "react";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { urlFor } from "../lib/client";
import { useStateContext } from "../context/StateContext";

const Product = ({ product: { image, name, slug, price }, product }) => {
  const { like, setLike, addLike, qty } = useStateContext();
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
