import { Dispatch } from 'redux';
import { delay } from '../consts';
import { ActionType } from '../redux/actionTypes';
import { store } from '../redux/store';

const createMergeGroup = (start: number, end: number) => {
  let group: { [key: number]: boolean } = {};
  for (let i = start; i <= end; i++) {
    group[i] = true;
  }
  return group;
};

const merge = async (
  dispatch: Dispatch,
  array: number[],
  leftStart: number,
  leftEnd: number,
  rightStart: number,
  rightEnd: number
) => {
  let temp: any = {};
  let index = 0;
  while (leftStart <= leftEnd && rightStart <= rightEnd) {
    dispatch({ type: ActionType.SET_MERGE_COMPARISON_PAIR, payload: { [leftStart]: true, [rightStart]: true } });
    await delay(0);
    if (array[leftStart] <= array[rightStart]) {
      dispatch({ type: ActionType.SET_MERGE_CHOSEN_NODE, payload: leftStart });
      dispatch({
        type: ActionType.SET_MERGE_COUNTER_GROUP,
        payload: { ...store.getState().mergeCounterGroup, [leftStart]: index + 1 },
      });
      temp[index] = array[leftStart];
      leftStart++;
    } else {
      dispatch({ type: ActionType.SET_MERGE_CHOSEN_NODE, payload: rightStart });
      dispatch({
        type: ActionType.SET_MERGE_COUNTER_GROUP,
        payload: { ...store.getState().mergeCounterGroup, [rightStart]: index + 1 },
      });
      temp[index] = array[rightStart];
      rightStart++;
    }
    await delay(0);
    index++;
  }

  dispatch({ type: ActionType.SET_MERGE_COMPARISON_PAIR, payload: {} });

  while (leftStart <= leftEnd) {
    dispatch({ type: ActionType.SET_MERGE_CHOSEN_NODE, payload: leftStart });
    dispatch({
      type: ActionType.SET_MERGE_COUNTER_GROUP,
      payload: { ...store.getState().mergeCounterGroup, [leftStart]: index + 1 },
    });
    await delay(0);
    temp[index] = array[leftStart];
    index++;
    leftStart++;
  }
  while (rightStart <= rightEnd) {
    dispatch({ type: ActionType.SET_MERGE_CHOSEN_NODE, payload: rightStart });
    dispatch({
      type: ActionType.SET_MERGE_COUNTER_GROUP,
      payload: { ...store.getState().mergeCounterGroup, [rightStart]: index + 1 },
    });
    await delay(0);
    temp[index] = array[rightStart];
    index++;
    rightStart++;
  }
  return temp;
};

export const mergeSort = async (dispatch: Dispatch) => {
  try {
    let array = store.getState().array;
    const length = array.length;
    let compareSize = 1;
    while (compareSize < length) {
      let pivot = 0;
      while (pivot < length) {
        let leftStart = pivot;
        let leftEnd = pivot + compareSize - 1;
        let rightStart = pivot + compareSize;
        let rightEnd = pivot + 2 * compareSize - 1;

        dispatch({ type: ActionType.SET_MERGE_LEFT_GROUP, payload: createMergeGroup(leftStart, leftEnd) });
        dispatch({ type: ActionType.SET_MERGE_RIGHT_GROUP, payload: createMergeGroup(rightStart, rightEnd) });

        dispatch({ type: ActionType.SET_MERGE_COMPARISON_PAIR, payload: {} });
        dispatch({ type: ActionType.SET_MERGE_COUNTER_GROUP, payload: {} });
        dispatch({ type: ActionType.SET_MERGE_CHOSEN_NODE, payload: -1 });
        await delay(0);

        if (rightStart >= length) {
          break;
        }
        if (rightEnd >= length) {
          rightEnd = length - 1;
        }
        const temp: any = await merge(dispatch, array, leftStart, leftEnd, rightStart, rightEnd);

        for (let j = 0; j < rightEnd - leftStart + 1; j++) {
          array[pivot + j] = temp[j];
        }

        pivot += 2 * compareSize;
      }
      compareSize *= 2;
    }
    return dispatch({ type: ActionType.END_SORT });
  } catch (error) {
    return dispatch({ type: ActionType.END_SORT });
  }
};
