import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cart: [
  //   {
  //     id: 1,
  //     name: "Margherita",
  //     unitPrice: 12,
  //     quantity: 1,
  //     totalPrice: 12,
  //   },
  // ],
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // payload is cart item
      state.cart.push(action.payload);
    },
    removeFromCart(state, action) {
      // payload is cart id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increasingQuantitty(state, action) {
      // payload is cart id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      // due to the reference, we don't need to update the state
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreasingQuantitty(state, action) {
      // payload is cart id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      // due to the reference, we don't need to update the state
      if (item.quantity === 0)
        cartSlice.caseReducers.removeFromCart(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  increasingQuantitty,
  decreasingQuantitty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// way to use selectors
export const getCart = (state) => state.cart.cart;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
// this way is not recommended so use reselect library
