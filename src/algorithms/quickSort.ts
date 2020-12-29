import { Dispatch } from 'redux';
import { delay } from '../consts';
import { ActionType } from '../redux/actionTypes';
import { store } from '../redux/store';

const createSubArray = (start: number, end: number) => {
  let subArray: { [key: number]: boolean } = {};
  for (let i = start; i <= end; i++) {
    subArray[i] = true;
  }
  return subArray;
};

const partition = async (dispatch: Dispatch, array: number[], start: number, end: number) => {
  dispatch({ type: ActionType.SET_QUICK_SUB_ARRAY, payload: createSubArray(start, end) });
  await delay();

  let i = start - 1; // index of smaller element
  let pivot = array[end];

  dispatch({ type: ActionType.SET_QUICK_SWAP_NODE, payload: i + 1 });
  dispatch({ type: ActionType.SET_QUICK_PIVOT_NODE, payload: end });
  await delay();

  for (let j = start; j < end; j++) {
    dispatch({ type: ActionType.SET_QUICK_CHECK_NODE, payload: j });
    dispatch({ type: ActionType.SET_QUICK_SWAP_NODE, payload: i + 1 });
    await delay();
    if (array[j] <= pivot) {
      dispatch({ type: ActionType.SET_QUICK_CHOSEN_NODE, payload: j });
      await delay();
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      dispatch({ type: ActionType.SET_QUICK_CHOSEN_NODE, payload: i });
      await delay();
      dispatch({ type: ActionType.SET_QUICK_SWAP_NODE, payload: i + 1 });
      await delay();
      dispatch({ type: ActionType.SET_QUICK_CHOSEN_NODE, payload: -1 });
    }
  }
  [array[i + 1], array[end]] = [array[end], array[i + 1]]; // swap with pivot
  return i + 1;
};

export const quickSort = async (dispatch: Dispatch) => {
  try {
    let array = store.getState().array;
    let start = 0;
    let end = array.length - 1;

    let auxStack = [];
    auxStack.push(start, end);

    while (auxStack.length) {
      end = auxStack.pop();
      start = auxStack.pop();

      let pivot = await partition(dispatch, array, start, end);

      if (pivot - 1 > start) {
        auxStack.push(start, pivot - 1);
      }

      if (pivot + 1 < end) {
        auxStack.push(pivot + 1, end);
      }
    }
    return dispatch({ type: ActionType.END_SORT });
  } catch (error) {
    return dispatch({ type: ActionType.END_SORT });
  }
};
