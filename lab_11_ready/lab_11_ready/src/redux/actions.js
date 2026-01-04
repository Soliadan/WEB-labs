

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_ITEM = "INCREMENT_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const CLEAR_CART = "CLEAR_CART";

// ADD_TO_CART приймає ще й quantity
export const addToCart = (perfume, size, quantity = 1) => ({
  type: ADD_TO_CART,
  payload: { perfume, size, quantity },
});

export const removeFromCart = (id, size) => ({
  type: REMOVE_FROM_CART,
  payload: { id, size },
});

export const incrementItem = (id, size) => ({
  type: INCREMENT_ITEM,
  payload: { id, size },
});

export const decrementItem = (id, size) => ({
  type: DECREMENT_ITEM,
  payload: { id, size },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
