import "./Cart.css";
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementItem,
  decrementItem,
} from "../redux/actions";

import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.currentUserId);
  const cartItems = useSelector((state) => state.carts[userId] || []);

  const totalSum = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const handleIncrement = (id, size) => {
    dispatch(incrementItem(id, size));
  };

  const handleDecrement = (id, size) => {
    dispatch(decrementItem(id, size));
  };

  const handleRemove = (id, size) => {
    dispatch(removeFromCart(id, size));
  };

  return (
    <main className="cart-page">
        <section>
          <h1>Shopping cart</h1>

          {cartItems.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-table">
                <div className="cart-header-row">
                  <div>Product</div>
                  <div>Volume</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Sum</div>
                  <div></div>
                </div>

                {cartItems.map((item) => (
                  <div
                    className="cart-row"
                    key={`${item.id}-${item.size || "default"}`}
                  >
                    <div>
                      <strong>
                        <Link
                          className="cart-product-link"
                          to={`/products/${item.id}`}
                        >
                          {item.name}
                        </Link>
                      </strong>
                      {item.brand && (
                        <div className="cart-brand">{item.brand}</div>
                      )}
                    </div>
                    <div>{item.size || "-"}</div>
                    <div>${item.price}</div>
                    <div className="cart-qty">
                      <button
                        type="button"
                        className="btn-dark cart-qty-btn"
                        onClick={() => handleDecrement(item.id, item.size)}
                      >
                        -
                      </button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="btn-dark cart-qty-btn"
                        onClick={() => handleIncrement(item.id, item.size)}
                      >
                        +
                      </button>
                    </div>
                    <div>${item.price * item.quantity}</div>
                    <div>
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => handleRemove(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <div className="cart-total-sum">
                  <span>Total:</span>
                  <span>${totalSum}</span>
                </div>
                {cartItems.length > 0 ? (
                  <Link to="/checkout" className="btn-dark checkout-btn">
                    Proceed to checkout
                  </Link>
                ) : (
                  <button type="button" className="btn-dark checkout-btn" disabled>
                    Proceed to checkout
                  </button>
                )}
              </div>
            </>
          )}
        </section>
    </main>
  );
};

export default Cart;
