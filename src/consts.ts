import { store } from './redux/store';

export const MIN_ARRAY_SIZE = 5;
export const MAX_ARRAY_SIZE = 50;
export const ARRAY_SIZE_SLIDER_JUMP = 5;
export const MIN_SPEED = 1;
export const MAX_SPEED = 100;
export const SPEED_SLIDER_JUMP = 1;
export const BUBBLE_SORT = 'BUBBLE_SORT';
export const MERGE_SORT = 'MERGE_SORT';
export const QUICK_SORT = 'QUICK_SORT';

export const delay = (speedChange: number) => {
  const newSpeed = store.getState().speed + speedChange;
  const delayTime = Math.floor((100 - newSpeed) * 5) + 1;
  const { isSorting, speed } = store.getState();
  return new Promise((resolve, reject) => {
    if (!isSorting) reject();
    else if (speed === 100 && speedChange !== 0) resolve(0);
    else setTimeout(resolve, delayTime);
  });
};
