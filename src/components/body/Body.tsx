/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../redux/actionTypes';
import './body.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { mergeSort } from '../../algorithms/mergeSort';
import { bubbleSort } from '../../algorithms/bubbleSort';
import { BUBBLE_SORT, MERGE_SORT, QUICK_SORT } from '../../consts';
import { quickSort } from '../../algorithms/quickSort';

export default function Body() {
  const arraySize = useSelector((state: any) => state.arraySize);
  const isSorting = useSelector((state: any) => state.isSorting);
  const array = useSelector((state: any) => state.array);
  const sortingAlgorithm = useSelector((state: any) => state.sortingAlgorithm);

  // Bubble sort
  const currentNode = useSelector((state: any) => state.bubbleCurrentNode);
  const switchNode = useSelector((state: any) => state.bubbleSwitchNode);

  // Merge sort
  const mergeLeftGroup = useSelector((state: any) => state.mergeLeftGroup);
  const mergeRightGroup = useSelector((state: any) => state.mergeRightGroup);
  const mergeComparisonPair = useSelector((state: any) => state.mergeComparisonPair);
  const mergeChosenNode = useSelector((state: any) => state.mergeChosenNode);
  const mergeCounterGroup = useSelector((state: any) => state.mergeCounterGroup);

  // Quick sort
  const quickPivotNode = useSelector((state: any) => state.quickPivotNode);
  const quickSubArray = useSelector((state: any) => state.quickSubArray);
  const quickCheckNode = useSelector((state: any) => state.quickCheckNode);
  const quickChosenNode = useSelector((state: any) => state.quickChosenNode);
  const quickSwapNode = useSelector((state: any) => state.quickSwapNode);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSorting) {
      switch (sortingAlgorithm) {
        case BUBBLE_SORT:
          bubbleSort(dispatch);
          break;
        case MERGE_SORT:
          mergeSort(dispatch);
          break;
        case QUICK_SORT:
          quickSort(dispatch);
          break;
      }
    }
  }, [isSorting]);

  useEffect(() => {
    dispatch({ type: ActionType.END_SORT });
    dispatch({ type: ActionType.NEW_ARRAY });
  }, [arraySize]);

  useEffect(() => {
    window.addEventListener('resize', (event: any) => setWindowWidth(event.target.innerWidth));
  });

  const width = Math.floor((windowWidth - 200) / array.length);
  const margin = array.length < 5 ? 10 : 2;
  const color = 'white';
  const fontSize = width > 70 ? 20 : 8;
  const nodeColor = 'rgba(66, 134, 244, .8)';
  const currentNodeColor = 'rgba(0, 0, 0, .8)';
  const switchNodeColor = 'rgba(100, 100, 100, 0.8)';
  const groupColor1 = 'rgba(255, 153, 51, .6)';
  const groupColor2 = 'rgba(153, 51, 255, .6)';
  const chosenNodeColor = 'rgba(102, 255, 102, .6)';

  const determineNodeColor = (index: number) => {
    switch (sortingAlgorithm) {
      case BUBBLE_SORT:
        return index === currentNode ? currentNodeColor : index === switchNode ? switchNodeColor : nodeColor;
      case MERGE_SORT:
        return index === mergeChosenNode
          ? chosenNodeColor
          : mergeLeftGroup[index]
          ? groupColor1
          : mergeRightGroup[index]
          ? groupColor2
          : nodeColor;
      case QUICK_SORT:
        return index === quickPivotNode
          ? currentNodeColor
          : index === quickChosenNode
          ? chosenNodeColor
          : index === quickCheckNode
          ? switchNodeColor
          : quickSubArray[index]
          ? groupColor1
          : nodeColor;
      default:
        return nodeColor;
    }
  };

  return (
    <div id="bodyContainer">
      {array &&
        array.map((value: number, index: number) => {
          return (
            <div
              className="arrayElement"
              key={index}
              style={{
                height: `${value * 3}px`,
                width: `${width}px`,
                marginLeft: `${margin}px`,
                marginRight: `${margin}px`,
                backgroundColor: determineNodeColor(index),
                color,
                fontSize: `${fontSize}px`,
              }}
            >
              {mergeCounterGroup[index] && <p className="index">{mergeCounterGroup[index]}</p>}
              {((mergeComparisonPair[index] && !mergeCounterGroup[index]) || index === quickSwapNode) && (
                <ArrowDropDownIcon className="arrow-down" />
              )}
              <p className="value">{value}</p>
            </div>
          );
        })}
    </div>
  );
}
