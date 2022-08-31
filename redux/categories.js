import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import agent from '../utils/agent';

const initialState = {
  categories: [],
};

export const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    refreshCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.categories) state.categories = action.payload.categories.categories;
    }
  }
});

export const asyncAddCategory = async (data) => {
  return await agent.Category.add(data)
    .catch(console.error);
};

export const asyncGetCategories = async() => {
  return await agent.Category.get()
    .catch(console.error);
}

export const asyncRefreshCategories = async (dispatch) => {
  return await asyncGetCategories()
    .then((data) => data && !data.failed && dispatch(refreshCategories(data)))
};

export const { refreshCategories } = categories.actions;

export const selectCategories = (state) => state.categories.categories;

export default categories.reducer;
