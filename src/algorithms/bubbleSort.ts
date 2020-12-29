import { Dispatch } from 'redux';
import { delay } from '../consts';
import { ActionType } from '../redux/actionTypes';
import { store } from '../redux/store';

export const bubbleSort = async (dispatch: Dispatch) => {
  try {
    let array = store.getState().array;
    for (let a = 0; a < array.length; a++) {
      let sorted = true;
      await (async () => {
        for (let b = 0; b < array.length; b++) {
          dispatch({ type: ActionType.SET_BUBBLE_CURRENT_NODE, payload: b });
          await delay();

          if (array[b] > array[b + 1]) {
            sorted = false;
            dispatch({ type: ActionType.SET_BUBBLE_SWITCH_NODE, payload: b + 1 });
            await delay();

            if (!store.getState().isSorting) return dispatch({ type: ActionType.END_SORT });

            // Switching nodes
            const tmp = array[b];
            array[b] = array[b + 1];
            array[b + 1] = tmp;

            dispatch({ type: ActionType.SET_BUBBLE_SWITCH_NODE, payload: b });
            dispatch({ type: ActionType.SET_BUBBLE_CURRENT_NODE, payload: b + 1 });

            await delay();
            dispatch({ type: ActionType.SET_BUBBLE_SWITCH_NODE, payload: -1 });
            dispatch({ type: ActionType.UPDATE_ARRAY, payload: array });
          }
        }
      })();
      if (sorted) break;
    }

    return dispatch({ type: ActionType.END_SORT });
  } catch (error) {
    return dispatch({ type: ActionType.END_SORT });
  }
};
