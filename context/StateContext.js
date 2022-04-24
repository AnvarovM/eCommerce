import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showLike, setShowLike] = useState(false);
  const [likeItems, setLikeItems] = useState([]);
  const [like, setLike] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);
  
  let foundProduct;
  let index;

  const addLike = (product, quantity) => {
    const checkProductInCart = likeItems.find(
        (item) => item._id === product._id
      );
  
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
  
      if (checkProductInCart) {
        const updatedLikeItems = likeItems.map((cartProduct) => {
          if (cartProduct._id === product._id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
        });
  
        setLikeItems(updatedLikeItems);
      } else {
          product.quantity = quantity;
          
          setCartItems([...cartItems, { ...product }]);
      }
  
      toast.success(`${product.name} added your Like list!`);
  }

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
        product.quantity = quantity;
        
        setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item, i) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    let newCartItems = cartItems.filter((item, i) => item._id !== id);

    if(value === 'inc') {
      setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);

    } else if(value === 'dec') {
      if (foundProduct.quantity >1) {
        setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prev) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        showLike,
        setShowLike,
        likeItems,
        setLikeItems,
        like,
        setLike,
        totalPrice,
        setTotalPrice,
        totalQuantity,
        setTotalQuantity,
        qty,
        incQty,
        decQty,
        onAdd,
        addLike,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
