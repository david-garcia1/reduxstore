import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';
import categoryReducer from '../features/categorySlice';  // Import the categoryReducer

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    category: categoryReducer,  // Add the category slice to the reducer
  },
});

export default store;
