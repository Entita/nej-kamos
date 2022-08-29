import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basket';
import accountReducer from './account';
import productsReducer from './products';
import categoriesReducer from './categories';
import subcategoriesReducer from './subcategories';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    account: accountReducer,
    products: productsReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
  },
  devTools: true,
});

export const wrapper = createWrapper(() => store);
