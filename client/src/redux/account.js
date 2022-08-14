import { createSlice } from '@reduxjs/toolkit';
import agent from '../api/agent';
import { asyncRefreshBasket } from './basket';

const initialState = {
  account: null,
};

export const account = createSlice({
  name: 'account',
  initialState,
  reducers: {
    refreshAccount: (state, action) => {
      state.account = action.payload === '' ? null : action.payload;
    },
  },
});

export const asyncLogout = async (dispatch) => {
  return await agent.Account.logout()
    .then((data) => {
      if (!data.failed) {
        dispatch(refreshAccount())
        asyncRefreshBasket(dispatch)
      }
    })
    .catch(console.error);
};

export const asyncRefreshAccount = async (dispatch) => {
  return await agent.Account.get()
    .then((data) => !data.failed && dispatch(refreshAccount(data)))
    .catch(console.error);
};

export const asyncCreateAccount = async (dispatch, data) => {
  return await agent.Account.register(data)
    .then((data) => {
      if (!data.failed) {
        dispatch(refreshAccount(data.data))
        asyncRefreshBasket(dispatch)
      }
    })
    .catch(console.error);
};

export const asyncAccountReplaceBasket = async (dispatch, data) => {
  return await agent.Account.replaceBasket(data)
    .then((data) => {
      if (!data.failed) {
        dispatch(refreshAccount(data.data));
        asyncRefreshBasket(dispatch);
      }
    })
    .catch(console.error);
};

export const asyncAccountUpdate = async (dispatch, data) => {
  return await agent.Account.update(data)
    .then((data) => !data.failed && dispatch(refreshAccount(data.data)))
    .catch(console.error);
};

export const asyncVerifyAccount = async (dispatch) => {
  return await agent.Account.verify()
    .then((data) => {
      if (!data.failed) {
        dispatch(refreshAccount(data.data));
        return !!data.data;
      }
    })
    .catch(console.error);
};

export const asyncLoginAccount = async (dispatch, data) => {
  return await agent.Account.login(data)
    .then((data) => {
      if (!data.failed) {
        if (data.basketReplace) {
          return data.data;
        } else {
          dispatch(refreshAccount(data.data));
          asyncRefreshBasket(dispatch);
        }
      }
    })
    .catch(console.error);
};

export const resendAccountVerification = async (dispatch) => {
  return await agent.Account.resendVerification()
    .then((data) => {
      if (!data.failed) {
        dispatch(refreshAccount(data.data));
        return data.data;
      }
    })
    .catch(console.error);
};

export const { refreshAccount } = account.actions;

export default account.reducer;
