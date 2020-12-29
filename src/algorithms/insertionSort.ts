import { Dispatch } from 'redux';
import { delay } from '../consts';
import { ActionType } from '../redux/actionTypes';
import { store } from '../redux/store';

export const insertionSort = async (dispatch: Dispatch) => {
  try {
    let array = store.getState().array;
    for (let i = 1; i < array.length; i++) {
      dispatch({ type: ActionType.SET_INSERTION_CURRENT_NODE, payload: i });
      await delay();

      const key = array[i];

      let j = i - 1;
      while (j >= 0 && key < array[j]) {
        dispatch({ type: ActionType.SET_INSERTION_SWITCH_NODE, payload: j+1 });
        await delay();
        array[j + 1] = array[j];
        j--;
        dispatch({ type: ActionType.SET_INSERTION_CURRENT_NODE, payload: -1 });
        await delay();
      }
      array[j + 1] = key;
      dispatch({ type: ActionType.SET_INSERTION_CURRENT_NODE, payload: j + 1 });
      dispatch({ type: ActionType.SET_INSERTION_SWITCH_NODE, payload: -1 });
      await delay();
    }
    return dispatch({ type: ActionType.END_SORT });
  } catch (error) {
    return dispatch({ type: ActionType.END_SORT });
  }
};
