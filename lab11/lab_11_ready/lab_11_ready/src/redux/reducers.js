
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
} from "./actions";

const GUEST_ID = "guest";

const initialState = {
  carts: {
    [GUEST_ID]: [],
  },
};

function upsertCart(state, userId, nextCart) {
  return {
    ...state,
    carts: {
      ...state.carts,
      [userId]: nextCart,
    },
  };
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CART: {
      return upsertCart(state, GUEST_ID, []);
    }

    case ADD_TO_CART: {
      const cartItems = state.carts[GUEST_ID] || [];

      const { perfume, size, quantity = 1 } = action.payload;
      const qty = quantity > 0 ? quantity : 1;

      const existingIndex = cartItems.findIndex(
        (item) => item.id === perfume.id && item.size === size
      );

      if (existingIndex !== -1) {
        const updated = [...cartItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return upsertCart(state, GUEST_ID, updated);
      }

      const newItem = {
        id: perfume.id,
        name: perfume.name,
        brand: perfume.brand,
        price: perfume.price,
        size: size || "",
        quantity: qty,
      };

      return upsertCart(state, GUEST_ID, [...cartItems, newItem]);
    }

    case REMOVE_FROM_CART: {
      const cartItems = state.carts[GUEST_ID] || [];
      const { id, size } = action.payload;
      return upsertCart(
        state,
        GUEST_ID,
        cartItems.filter((item) => !(item.id === id && item.size === size))
      );
    }

    case INCREMENT_ITEM: {
      const cartItems = state.carts[GUEST_ID] || [];
      const { id, size } = action.payload;

      return upsertCart(
        state,
        GUEST_ID,
        cartItems.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }

    case DECREMENT_ITEM: {
      const cartItems = state.carts[GUEST_ID] || [];
      const { id, size } = action.payload;

      return upsertCart(
        state,
        GUEST_ID,
        cartItems.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
      );
    }

    default:
      return state;
  }
}
