import { createSlice } from '@reduxjs/toolkit';
import agent from '../api/agent';

const initialState = {
  subcategories: [],
};

export const subcategories = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {
    refreshSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
  },
});

export const asyncAddSubcategories = async (data) => {
  return await agent.Subcategory.add(data)
    .catch(console.error);
};

export const asyncGetSubcategories = async() => {
  return await agent.Subcategory.get()
    .catch(console.error);
}

export const asyncRefreshSubcategories = async (dispatch) => {
  return await asyncGetSubcategories()
    .then((data) => !data?.failed && dispatch(refreshSubcategories(data)))
};

export const { refreshSubcategories } = subcategories.actions;

export default subcategories.reducer;
