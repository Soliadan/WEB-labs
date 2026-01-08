import { createStore } from "redux";
import rootReducer from "./reducers";

// ---- Load from localStorage ----
function loadState() {
  try {
    const saved = localStorage.getItem("appState");
    if (!saved) return undefined;
    return JSON.parse(saved);
  } catch (e) {
    return undefined;
  }
}

// ---- Save to localStorage ----
function saveState(state) {
  try {
    localStorage.setItem("appState", JSON.stringify(state));
  } catch (e) {
    // ignore
  }
}

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
