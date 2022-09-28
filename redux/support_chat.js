import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import agent from '../utils/agent';

const initialState = {
  support_chat: [],
};

export const support_chat = createSlice({
  name: 'support_chat',
  initialState,
  reducers: {
    refreshSupportChat: (state, action) => {
      state.support_chat = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.support_chat) state.support_chat = action.payload.support_chat.support_chat;
    }
  }
});

export const asyncAddSupportChat = async (dispatch, data) => {
  return await agent.Support.add(data)
    .then((data) => data && !data.failed && asyncRefreshSupportChat(dispatch))
    .catch(console.error);
};

export const asyncGetSupportChat = async() => {
  return await agent.Support.get()
    .catch(console.error);
}

export const asyncRefreshSupportChat = async (dispatch) => {
  return await asyncGetSupportChat()
    .then((data) => data && !data.failed && dispatch(refreshSupportChat(data)))
};

export const { refreshSupportChat } = support_chat.actions;

export const selectSupportChat = (state) => state.support_chat.support_chat;

export default support_chat.reducer;
