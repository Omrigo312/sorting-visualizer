import { createStore } from 'redux';
import { AppState } from './AppState';
import { reducer } from './reducer';

export const store = createStore(reducer, new AppState());
