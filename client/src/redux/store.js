import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basket';
import accountReducer from './account';
import productsReducer from './products';
import categoriesReducer from './categories';
import subcategoriesReducer from './subcategories';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    account: accountReducer,
    products: productsReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
  },
});
