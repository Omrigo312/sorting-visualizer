export const buildArray = (arraySize: number) => {
  let array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 100 + 1));
  }
  return array;
};

export class AppState {
  public arraySize: number = 25;
  public array: number[] = buildArray(this.arraySize);
  public speed: number = 50;
  public isSorting: boolean = false;
  public sortingAlgorithm: string = 'BUBBLE_SORT';
  public bubbleCurrentNode: number = -1;
  public bubbleSwitchNode: number = -1;
  public mergeLeftGroup: object = {};
  public mergeRightGroup: object = {};
  public mergeComparisonPair: object = {};
  public mergeCounterGroup: any = {};
  public mergeChosenNode: number = -1;
  public quickPivotNode: number = -1;
  public quickSubArray: object = {};
  public quickCheckNode: number = -1;
  public quickChosenNode: number = -1;
  public quickSwapNode: number = -1;
}
