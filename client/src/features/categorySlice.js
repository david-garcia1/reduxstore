import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [], // Default to an empty array
  currentCategory: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { updateCategories, updateCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;