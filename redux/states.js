import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  states: {
    showBasket: false,
    showChat: false,
    chat: [
      {
        name: 'YOU',
        createdAt: '13:36',
        text: 'Can i get some help over here?',
      },
      {
        name: 'SUPPORT',
        createdAt: '13:30',
        text: 'BBLFDB BDF BDFBFDLFBDB BFD',
      },
      {
        name: 'SUPPORT',
        createdAt: '13:24',
        text: 'FDSFNSD FDS FSD FSDDSFSDFDS FSD F SDFSD',
      },
    ],
  },
};

export const states = createSlice({
  name: 'states',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.states[action.payload.name] = action.payload.value;
    },
  },
});

export const changeShowBasket = (dispatch, state) => {
  dispatch(changeState({
    name: 'showBasket',
    value: state,
  }))
};

export const changeShowChat = (dispatch, state) => {
  dispatch(changeState({
    name: 'showChat',
    value: state,
  }))
};

export const changeChat = (dispatch, state) => {
  dispatch(changeState({
    name: 'chat',
    value: state,
  }))
};

export const { changeState } = states.actions;

export const selectStates = (state) => state.states.states;

export default states.reducer;
