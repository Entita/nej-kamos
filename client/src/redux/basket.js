import { createSlice } from '@reduxjs/toolkit';
import agent from '../api/agent';

const initialState = {
  basket: {
    products: [],
  }
};

export const basket = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    refreshBasket: (state, action) => {
      state.basket = action.payload === '' ? null : action.payload;
    },
  },
});

export const asyncRefreshBasket = async (dispatch) => {
  return await agent.Basket.get()
    .then((data) => data && !data.failed && dispatch(refreshBasket(data.data)))
    .catch(console.error);
};

export const asyncBasketSetItem = async (dispatch, id, quantity) => {
  return await agent.Basket.setItem(id, quantity)
    .then((data) => data && !data.failed && dispatch(refreshBasket(data)))
    .catch(console.error);
};

export const asyncBasketAddItem = async (dispatch, id, quantity) => {
  return await agent.Basket.addItem(id, quantity)
    .then((data) => data && !data.failed && dispatch(refreshBasket(data)))
    .catch(console.error);
};

export const asyncBasketDeleteItem = async (dispatch, id, quantity) => {
  return await agent.Basket.deleteItem(id, quantity)
    .then((data) => data && !data.failed && dispatch(refreshBasket(data)))
    .catch(console.error);
};

export const asyncApplyDiscountCode = async (dispatch, discountCode) => {
  return await agent.Coupon.apply(discountCode)
    .then(data => data.data && dispatch(refreshBasket(data.data)));
}

export const asyncUnapplyDiscountCode = async (dispatch) => {
  return await agent.Coupon.unapply()
    .then(data => data.data && dispatch(refreshBasket(data.data)));
}

export const { refreshBasket } = basket.actions;

export default basket.reducer;
