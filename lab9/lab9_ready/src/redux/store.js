import { createStore } from "redux";
import cartReducer from "./reducers";

// ---- Функція для завантаження з localStorage ----
function loadState() {
  try {
    const savedState = localStorage.getItem("cartState");
    if (!savedState) return undefined; // якщо нічого нема — повертаємо undefined
    return JSON.parse(savedState);
  } catch (err) {
    return undefined;
  }
}

// ---- Функція для збереження в localStorage ----
function saveState(state) {
  try {
    const stateToSave = {
      cartItems: state.cartItems
    };
    localStorage.setItem("cartState", JSON.stringify(stateToSave));
  } catch (err) {
    console.error("Error saving cart state:", err);
  }
}


const persistedState = loadState();
const store = createStore(
  cartReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


store.subscribe(() => {
  saveState(store.getState());
});

export default store;
