import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import agent from '../utils/agent';

const initialState = {
  products: [],
};

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    refreshProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.products) state.products = action.payload.products.products;
    }
  }
});

export const asyncAddProduct = async (data) => {
  return await agent.Product.add(data)
    .catch(console.error);
};

export const asyncRefreshProducts = async (dispatch) => {
  return await agent.Product.get()
    .then((data) => data && !data.failed && dispatch(refreshProducts(data)))
    .catch(console.error);
};

export const filterProducts = (products, query) => {
  const category = query.get('category');
  const subcategory = query.get('subcategory');

  if (!category) return products;
  if (!subcategory) return products.filter((product) => product.category === category);
  return products.filter((product) => product.subcategory === subcategory && product.category === category);
};

export const getProduct = (products, productId) => {
  return products.filter((product) => product._id === productId)[0];
}

export const { refreshProducts } = products.actions;

export const selectProducts = (state) => state.products.products;

export default products.reducer;
