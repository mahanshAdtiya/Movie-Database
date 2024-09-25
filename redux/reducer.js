import { combineReducers } from 'redux';
// const {createStore} = require('redux')//to run in node

import { ADD_FAV } from './action';

const favReducer = (state = [], action) => {
  if (action.type === 'reset') {
    return {};
  }
  if (action.type === ADD_FAV) {
    let newstate = [...state];
    let favkey = Object.keys(action.payload)[0];
    console.log(state.includes(favkey));
    if (action.payload[favkey] && !state.includes(favkey)) {
      return [...state, favkey];
    } else {
      const index = state.indexOf(favkey);
      if (index > -1) {
        newstate.splice(index, 1);
      }
      return newstate;
    }
  }
  return state;
};

const reducer = combineReducers({
  fav: favReducer,
});

export default reducer;
