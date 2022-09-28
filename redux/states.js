import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  states: {
    showBasket: false,
    showChat: false,
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

export const { changeState } = states.actions;

export const selectStates = (state) => state.states.states;

export default states.reducer;
