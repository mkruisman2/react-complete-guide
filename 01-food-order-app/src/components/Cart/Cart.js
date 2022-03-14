import React, { useState, useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderSent, setOrderSent] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (customerDetails) => {
    const orderSummary = {
      orderedItems: cartCtx.items,
      orderedTotalAmount: cartCtx.totalAmount,
      customerDetails: customerDetails,
    };
    setError(null);
    setIsSubmitting(true);
    console.log(orderSummary)
    try {
      const response = await fetch(
      "https://react-http-b3cc5-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(orderSummary),
      }
    )
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    } catch (error) {
      setError(error.message);
    }
    setIsSubmitting(false);
    setOrderSent(true);
    cartCtx.resetItems();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = <React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!hasItems && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        </div>
      )}
      {hasItems && <Checkout onClose={props.onClose} onOrder={submitOrderHandler}/>}
      {error && <p>{error}</p>}
  </React.Fragment>

  const isSubmittingContent = <p>Sending order...</p>;
  const orderSentContent = <p>Your order has been sent successfully!</p>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !orderSent && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && orderSent && orderSentContent}
    </Modal>
  );
};

export default Cart;
