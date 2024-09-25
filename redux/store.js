import { createStore } from 'redux';

import reducer from './reducer';

import { updateContact } from './action';
const store = createStore(reducer);

export default store;
