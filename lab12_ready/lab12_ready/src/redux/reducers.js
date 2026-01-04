// Root reducer: auth + carts (per user)

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_USER,
  UPDATE_PROFILE,
} from "./actions";

const GUEST_ID = "guest";

// Minimal guest user so app works without login
const initialState = {
  auth: {
    currentUserId: GUEST_ID,
    users: {
      [GUEST_ID]: {
        email: "",
        password: "",
        profile: {
          email: "",
          gender: "",
          phone: "",
          street: "",
          houseApartment: "",
        },
      },
    },
  },
  carts: {
    [GUEST_ID]: [],
  },
};

function getUserCart(state, userId) {
  return state.carts[userId] || [];
}

function upsertCart(state, userId, nextCart) {
  return {
    ...state,
    carts: {
      ...state.carts,
      [userId]: nextCart,
    },
  };
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    // -------- AUTH --------
    case REGISTER_USER: {
      const { email, password, profile } = action.payload || {};
      const safeEmail = (email || "").trim().toLowerCase();

      if (!safeEmail) return state;

      // If user already exists, do nothing (UI should show error)
      if (state.auth.users[safeEmail]) return state;

      const nextUsers = {
        ...state.auth.users,
        [safeEmail]: {
          email: safeEmail,
          password: password || "",
          profile: {
            email: safeEmail,
            gender: profile?.gender || "",
            phone: profile?.phone ?? "",
            street: profile?.street || "",
            houseApartment: profile?.houseApartment || "",
          },
        },
      };

      return {
        ...state,
        auth: {
          ...state.auth,
          currentUserId: safeEmail,
          users: nextUsers,
        },
        carts: {
          ...state.carts,
          [safeEmail]: state.carts[safeEmail] || [],
        },
      };
    }

    case LOGIN_USER: {
      const { email, password } = action.payload || {};
      const safeEmail = (email || "").trim().toLowerCase();
      const user = state.auth.users[safeEmail];

      // If no user or wrong password: ignore (UI shows error)
      if (!user || (user.password || "") !== (password || "")) return state;

      return {
        ...state,
        auth: {
          ...state.auth,
          currentUserId: safeEmail,
        },
        carts: {
          ...state.carts,
          [safeEmail]: state.carts[safeEmail] || [],
        },
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        auth: {
          ...state.auth,
          currentUserId: GUEST_ID,
        },
      };
    }

    case SET_CURRENT_USER: {
      const userId = action.payload?.userId;
      if (!userId || !state.auth.users[userId]) return state;

      return {
        ...state,
        auth: {
          ...state.auth,
          currentUserId: userId,
        },
        carts: {
          ...state.carts,
          [userId]: state.carts[userId] || [],
        },
      };
    }

    case UPDATE_PROFILE: {
      const { userId, profile, password } = action.payload || {};
      if (!userId || !state.auth.users[userId]) return state;

      const prev = state.auth.users[userId];

      return {
        ...state,
        auth: {
          ...state.auth,
          users: {
            ...state.auth.users,
            [userId]: {
              ...prev,
              password: password !== undefined ? password : prev.password,
              profile: {
                ...prev.profile,
                ...profile,
              },
            },
          },
        },
      };
    }

    // -------- CART (PER USER) --------
    case ADD_TO_CART: {
      const { perfume, size, quantity } = action.payload || {};
      const userId = state.auth.currentUserId || GUEST_ID;
      const cart = getUserCart(state, userId);

      const q = Number(quantity) || 1;
      const newItem = {
        ...perfume,
        size,
        quantity: q,
      };

      const existingIndex = cart.findIndex(
        (item) => item.id === perfume.id && item.size === size
      );

      if (existingIndex !== -1) {
        const updated = [...cart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + q,
        };
        return upsertCart(state, userId, updated);
      }

      return upsertCart(state, userId, [...cart, newItem]);
    }

    case REMOVE_FROM_CART: {
      const { id, size } = action.payload || {};
      const userId = state.auth.currentUserId || GUEST_ID;
      const cart = getUserCart(state, userId);
      return upsertCart(
        state,
        userId,
        cart.filter((item) => !(item.id === id && item.size === size))
      );
    }

    case INCREMENT_ITEM: {
      const { id, size } = action.payload || {};
      const userId = state.auth.currentUserId || GUEST_ID;
      const cart = getUserCart(state, userId);

      const next = cart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return upsertCart(state, userId, next);
    }

    case DECREMENT_ITEM: {
      const { id, size } = action.payload || {};
      const userId = state.auth.currentUserId || GUEST_ID;
      const cart = getUserCart(state, userId);

      const next = cart.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

      return upsertCart(state, userId, next);
    }

    case CLEAR_CART: {
      const userId =
        action.payload?.userId || state.auth.currentUserId || GUEST_ID;
      return upsertCart(state, userId, []);
    }

    default:
      return state;
  }
}

export default rootReducer;
export { GUEST_ID };
