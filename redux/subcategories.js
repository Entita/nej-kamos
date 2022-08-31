import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import agent from '../utils/agent';

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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.subcategories) state.subcategories = action.payload.subcategories.subcategories;
    }
  }
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
    .then((data) => data && !data.failed && dispatch(refreshSubcategories(data)))
};

export const { refreshSubcategories } = subcategories.actions;

export const selectSubcategories = (state) => state.subcategories.subcategories;

export default subcategories.reducer;
