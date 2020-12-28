import { Action } from './IAction';
import { ActionType } from './actionTypes';
import { AppState, buildArray } from './AppState';

export function reducer(state: AppState, action: Action): AppState {
  const { type, payload } = action;
  const {
    SET_ARRAY_SIZE,
    SET_SPEED,
    START_SORT,
    END_SORT,
    NEW_ARRAY,
    UPDATE_ARRAY,
    SET_BUBBLE_CURRENT_NODE,
    SET_BUBBLE_SWITCH_NODE,
    SET_MERGE_CHOSEN_NODE,
    SET_MERGE_COMPARISON_PAIR,
    SET_MERGE_COUNTER_GROUP,
    SET_MERGE_LEFT_GROUP,
    SET_MERGE_RIGHT_GROUP,
    SET_SORTING_ALGORITHM,
    SET_QUICK_CHECK_NODE,
    SET_QUICK_CHOSEN_NODE,
    SET_QUICK_PIVOT_NODE,
    SET_QUICK_SUB_ARRAY,
    SET_QUICK_SWAP_NODE,
  } = ActionType;
  switch (type) {
    case SET_SPEED:
      return {
        ...state,
        speed: payload,
      };
    case SET_ARRAY_SIZE:
      return {
        ...state,
        arraySize: payload,
      };
    case START_SORT:
      return {
        ...state,
        isSorting: true,
      };
    case END_SORT:
      return {
        ...state,
        isSorting: false,
        bubbleCurrentNode: -1,
        bubbleSwitchNode: -1,
        mergeChosenNode: -1,
        mergeComparisonPair: {},
        mergeCounterGroup: {},
        mergeLeftGroup: {},
        mergeRightGroup: {},
        quickCheckNode: -1,
        quickChosenNode: -1,
        quickPivotNode: -1,
        quickSubArray: {},
        quickSwapNode: -1,
      };
    case NEW_ARRAY:
      return {
        ...state,
        isSorting: false,
        array: buildArray(state.arraySize),
      };
    case UPDATE_ARRAY:
      return {
        ...state,
        array: payload,
      };
    case SET_SORTING_ALGORITHM:
      return {
        ...state,
        sortingAlgorithm: payload,
      };
    case SET_BUBBLE_CURRENT_NODE:
      return {
        ...state,
        bubbleCurrentNode: payload,
      };
    case SET_BUBBLE_SWITCH_NODE:
      return {
        ...state,
        bubbleSwitchNode: payload,
      };
    case SET_MERGE_LEFT_GROUP:
      return {
        ...state,
        mergeLeftGroup: payload,
      };
    case SET_MERGE_RIGHT_GROUP:
      return {
        ...state,
        mergeRightGroup: payload,
      };
    case SET_MERGE_COMPARISON_PAIR:
      return {
        ...state,
        mergeComparisonPair: payload,
      };
    case SET_MERGE_COUNTER_GROUP:
      return {
        ...state,
        mergeCounterGroup: payload,
      };
    case SET_MERGE_CHOSEN_NODE:
      return {
        ...state,
        mergeChosenNode: payload,
      };
    case SET_QUICK_PIVOT_NODE:
      return {
        ...state,
        quickPivotNode: payload,
      };
    case SET_QUICK_SUB_ARRAY:
      return {
        ...state,
        quickSubArray: payload,
      };
    case SET_QUICK_SWAP_NODE:
      return {
        ...state,
        quickSwapNode: payload,
      };
    case SET_QUICK_CHECK_NODE:
      return {
        ...state,
        quickCheckNode: payload,
      };
    case SET_QUICK_CHOSEN_NODE:
      return {
        ...state,
        quickChosenNode: payload,
      };

    default:
      return state;
  }
}
