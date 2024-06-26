import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import agent from '../utils/agent';
import { asyncRefreshBasket } from './basket';

const initialState = {
  account: null,
};

export const account = createSlice({
  name: 'account',
  initialState,
  reducers: {
    refreshAccount: (state, action) => {
      if (action.payload || action.payload === null) state.account = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.account || action.payload.account === null) state.account = action.payload.account.account;
    }
  },
});

export const asyncRefreshAccount = async (dispatch) => {
  return await agent.Account.get()
    .then((data) => data && !data.failed && dispatch(refreshAccount(data.data)))
    .catch(console.error);
};

export const asyncCreateAccount = async (dispatch, data) => {
  return await agent.Account.register(data)
    .then((data) => {
      if (data && !data.failed) {
        dispatch(refreshAccount(data.data))
        asyncRefreshBasket(dispatch)
      }
      return data;
    })
    .catch(console.error);
};

export const asyncAccountReplaceBasket = async (dispatch, data) => {
  return await agent.Account.replaceBasket(data)
    .then((data) => {
      if (data && !data.failed) {
        dispatch(refreshAccount(data.data));
        asyncRefreshBasket(dispatch);
      }
    })
    .catch(console.error);
};

export const asyncAccountUpdate = async (dispatch, data) => {
  return await agent.Account.update(data)
    .then((data) => data && !data.failed && dispatch(refreshAccount(data.data)))
    .catch(console.error);
};

export const asyncVerifyAccount = async (dispatch) => {
  return await agent.Account.verify()
    .then((data) => {
      if (data && !data.failed) {
        dispatch(refreshAccount(data.data));
        return !!data.data;
      }
    })
    .catch(console.error);
};

export const asyncLoginAccount = async (dispatch, data) => {
  return await agent.Account.login(data)
    .then((data) => {
      if (data && !data.failed) {
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

export const asyncLogout = async (dispatch) => {
  return await agent.Account.logout()
    .then((data) => {
      if (data && !data.failed) {
        dispatch(refreshAccount(null))
        asyncRefreshBasket(dispatch)
      }
    })
    .catch(console.error);
};

export const resendAccountVerification = async (dispatch) => {
  return await agent.Account.resendVerification()
    .then((data) => {
      if (data && !data.failed) {
        dispatch(refreshAccount(data.data));
        return data.data;
      }
    })
    .catch(console.error);
};

export const asyncFavoriteProductToAccount = async (dispatch, data) => {
  return await agent.Account.favorite(data)
    .then((data) => {
      if (data && !data.failed) dispatch(refreshAccount(data.data));
    })
    .catch(console.error);
};

export const asyncUnfavoriteProductToAccount = async (dispatch, data) => {
  return await agent.Account.unfavorite(data)
    .then((data) => {
      if (data && !data.failed) dispatch(refreshAccount(data.data));
    })
    .catch(console.error);
};

export const { refreshAccount } = account.actions;

export const selectAccount = (state) => state.account.account;

export default account.reducer;
