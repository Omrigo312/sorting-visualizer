/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../redux/actionTypes';
import './body.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { mergeSort } from '../../algorithms/mergeSort';
import { bubbleSort } from '../../algorithms/bubbleSort';
import { BUBBLE_SORT, MERGE_SORT } from '../../consts';

export default function Body() {
  const arraySize = useSelector((state: any) => state.arraySize);
  const isSorting = useSelector((state: any) => state.isSorting);
  const array = useSelector((state: any) => state.array);
  const sortingAlgorithm = useSelector((state: any) => state.sortingAlgorithm);

  // Bubble sort
  const currentNode = useSelector((state: any) => state.bubbleCurrentNode);
  const switchNode = useSelector((state: any) => state.bubbleSwitchNode);

  // Merge sort
  const leftGroup = useSelector((state: any) => state.mergeLeftGroup);
  const rightGroup = useSelector((state: any) => state.mergeRightGroup);
  const comparisonPair = useSelector((state: any) => state.mergeComparisonPair);
  const chosenNode = useSelector((state: any) => state.mergeChosenNode);
  const counterGroup = useSelector((state: any) => state.mergeCounterGroup);

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
      }
    }
  }, [isSorting]);

  useEffect(() => {
    dispatch({ type: ActionType.END_SORT });
    dispatch({ type: ActionType.NEW_ARRAY });
  }, [arraySize]);

  const width = Math.floor((window.innerWidth - 200) / array.length);
  const margin = array.length < 5 ? 10 : 2;
  const color = 'white';
  const fontSize = width > 70 ? 20 : 8;
  const nodeColor = 'rgba(66, 134, 244, .8)';
  const currentNodeColor = 'rgba(0, 0, 0, .8)';
  const switchNodeColor = 'rgba(100, 100, 100, 0.8)';
  const mergeLeftGroupColor = 'rgba(255, 153, 51, .6)';
  const mergeRightGroupColor = 'rgba(153, 51, 255, .6)';
  const mergeChosenNodeColor = 'rgba(102, 255, 102, .6)';

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
                backgroundColor:
                  index === currentNode && currentNode !== -1
                    ? currentNodeColor
                    : index === switchNode && switchNode !== -1
                    ? switchNodeColor
                    : index === chosenNode
                    ? mergeChosenNodeColor
                    : leftGroup[index]
                    ? mergeLeftGroupColor
                    : rightGroup[index]
                    ? mergeRightGroupColor
                    : nodeColor,
                color,
                fontSize: `${fontSize}px`,
              }}
            >
              {counterGroup[index] && <p className="index">{counterGroup[index]}</p>}
              {comparisonPair[index] && !counterGroup[index] && <ArrowDropDownIcon className="arrow-down" />}
              <p className="value">{value}</p>
            </div>
          );
        })}
    </div>
  );
}
