// Redux actions: cart + auth

// --- Cart ---
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREMENT_ITEM = "INCREMENT_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const CLEAR_CART = "CLEAR_CART";

// --- Auth ---
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

// Cart actions
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

export const clearCart = (userId) => ({
  type: CLEAR_CART,
  payload: { userId },
});

// Auth actions
export const registerUser = (payload) => ({
  // payload: { email, password, profile }
  type: REGISTER_USER,
  payload,
});

export const loginUser = (payload) => ({
  // payload: { email, password }
  type: LOGIN_USER,
  payload,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const setCurrentUser = (userId) => ({
  type: SET_CURRENT_USER,
  payload: { userId },
});

export const updateProfile = (payload) => ({
  // payload: { userId, profile, password? }
  type: UPDATE_PROFILE,
  payload,
});
