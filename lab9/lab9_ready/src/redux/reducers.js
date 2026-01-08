// X3: Redux reducer for cart

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
} from "./actions";

const initialState = {
  cartItems: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { perfume, size, quantity = 1 } = action.payload;
      const qty = quantity > 0 ? quantity : 1;

      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === perfume.id && item.size === size
      );

      if (existingIndex !== -1) {
        const updated = [...state.cartItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return { ...state, cartItems: updated };
      }

      const newItem = {
        id: perfume.id,
        name: perfume.name,
        brand: perfume.brand,
        price: perfume.price,
        size: size || "",
        quantity: qty,
      };

      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
    }

    case REMOVE_FROM_CART: {
      const { id, size } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => !(item.id === id && item.size === size)
        ),
      };
    }

    case INCREMENT_ITEM: {
      const { id, size } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case DECREMENT_ITEM: {
      const { id, size } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };
    }

    default:
      return state;
  }
}

export default cartReducer;
