import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    cartOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartOpen = true;
      state.cart.push(action.payload); // Action carries product object
    },
    addMultipleToCart: (state, action) => {
      state.cart = state.cart.concat(action.payload); // Action carries array of products
    },
    updateCartQuantity: (state, action) => {
      const { _id, purchaseQuantity } = action.payload; // Action carries _id and purchaseQuantity
      state.cartOpen = true;
      state.cart = state.cart.map(product =>
        product._id === _id ? { ...product, purchaseQuantity } : product
      );
    },
    removeFromCart: (state, action) => {
      const { _id } = action.payload; // Action carries _id
      state.cart = state.cart.filter(product => product._id !== _id);
      state.cartOpen = state.cart.length > 0;
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
  },
});

// Selector to access the cart from the state
export const selectCart = (state) => state.cart.cart;

// Selector to access the cartOpen from the state
export const selectCartOpen = (state) => state.cart.cartOpen;

export const {
  addToCart,
  addMultipleToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;