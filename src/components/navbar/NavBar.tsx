import { AppBar, Button, IconButton, Slider, Toolbar, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CachedIcon from '@material-ui/icons/Cached';
import StopIcon from '@material-ui/icons/Stop';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import './navbar.css';
import icon from '../../images/icon.png';
import {
  MAX_ARRAY_SIZE,
  MIN_ARRAY_SIZE,
  MAX_SPEED,
  MIN_SPEED,
  ARRAY_SIZE_SLIDER_JUMP,
  SPEED_SLIDER_JUMP,
  BUBBLE_SORT,
  MERGE_SORT,
} from '../../consts';
import { ActionType } from '../../redux/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export default function NavBar() {
  const speed = useSelector((state: any) => state.speed);
  const arraySize = useSelector((state: any) => state.arraySize);
  const isSorting = useSelector((state: any) => state.isSorting);
  const sortingAlgorithm = useSelector((state: any) => state.sortingAlgorithm);

  const dispatch = useDispatch();

  const onSizeChange = (_event: any, newArraySize: any) => {
    dispatch({ type: ActionType.SET_ARRAY_SIZE, payload: newArraySize });
    if (isSorting) dispatch({ type: ActionType.END_SORT });
  };

  const onSpeedChange = (_event: any, newSpeed: any) => {
    dispatch({ type: ActionType.SET_SPEED, payload: newSpeed });
  };

  const changeArraySize = (value: number) => {
    const newArraySize = arraySize + value;
    if (newArraySize >= MIN_ARRAY_SIZE && newArraySize <= MAX_ARRAY_SIZE) {
      dispatch({ type: ActionType.SET_ARRAY_SIZE, payload: newArraySize });
      if (isSorting) dispatch({ type: ActionType.END_SORT });
    }
  };

  const changeSpeed = (value: number) => {
    const newSpeed = speed + value;
    if (newSpeed >= MIN_SPEED && newSpeed <= MAX_SPEED) {
      dispatch({ type: ActionType.SET_SPEED, payload: newSpeed });
    }
  };

  const onSortButtonClicked = (isSorting: boolean) => {
    isSorting ? dispatch({ type: ActionType.END_SORT }) : dispatch({ type: ActionType.START_SORT });
  };

  const onNewButtonClicked = () => {
    dispatch({ type: ActionType.END_SORT });
    dispatch({ type: ActionType.NEW_ARRAY });
  };

  const setSortingAlgorithm = (event: React.MouseEvent<HTMLElement>, sortingAlgorithm: string) => {
    if (isSorting) dispatch({ type: ActionType.END_SORT });
    if (sortingAlgorithm) dispatch({ type: ActionType.SET_SORTING_ALGORITHM, payload: sortingAlgorithm });
  };

  return (
    <AppBar position="static">
      <Toolbar className="navbar" style={{ minHeight: 128 }}>
        <Grid container spacing={3}>
          <Grid className="navbar-header" item xs={2}>
            <img src={icon} className="logo" alt="logo" />
            <h2>Sort It Out!</h2>
          </Grid>
          <Grid item xs={3} style={{ alignItems: 'center', display: 'grid' }}>
            <div>
              <Typography gutterBottom>Array Size</Typography>
              <Grid container>
                <Grid item>
                  <IconButton
                    aria-label="subtract"
                    style={{ paddingTop: 0 }}
                    color="primary"
                    onClick={() => changeArraySize(-ARRAY_SIZE_SLIDER_JUMP)}
                  >
                    <IndeterminateCheckBoxIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <Slider
                    value={arraySize}
                    step={ARRAY_SIZE_SLIDER_JUMP}
                    valueLabelDisplay="auto"
                    min={MIN_ARRAY_SIZE}
                    max={MAX_ARRAY_SIZE}
                    onChange={onSizeChange}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="add"
                    color="primary"
                    style={{ paddingTop: 0 }}
                    onClick={() => changeArraySize(ARRAY_SIZE_SLIDER_JUMP)}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={3} style={{ alignItems: 'center', display: 'grid' }}>
            <div>
              <Typography gutterBottom>Speed</Typography>
              <Grid container>
                <Grid item>
                  <IconButton
                    aria-label="subtract"
                    color="primary"
                    style={{ paddingTop: 0 }}
                    onClick={() => changeSpeed(-SPEED_SLIDER_JUMP)}
                  >
                    <IndeterminateCheckBoxIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <Slider value={speed} min={MIN_SPEED} max={MAX_SPEED} onChange={onSpeedChange} />
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="add"
                    color="primary"
                    style={{ paddingTop: 0 }}
                    onClick={() => changeSpeed(SPEED_SLIDER_JUMP)}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid className="buttons" item xs={1} style={{ display: 'grid', alignItems: 'center' }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: isSorting ? 'crimson' : 'green',
                color: 'white',
              }}
              onClick={() => onSortButtonClicked(isSorting)}
              endIcon={isSorting ? <StopIcon /> : <PlayArrowIcon />}
            >
              {isSorting ? 'Stop' : 'Start'}
            </Button>
            <Button variant="contained" color="primary" onClick={onNewButtonClicked} endIcon={<CachedIcon />}>
              New
            </Button>
          </Grid>
          <Grid item xs={3} style={{ textAlign: 'center' }}>
            <ToggleButtonGroup
              className="toggle-group"
              orientation="vertical"
              exclusive
              aria-label="Choose Sorting Algorithm"
              value={sortingAlgorithm}
              onChange={setSortingAlgorithm}
            >
              <ToggleButton value={BUBBLE_SORT} aria-label="bubble sort">
                Bubble Sort
              </ToggleButton>
              <ToggleButton value={MERGE_SORT} aria-label="merge sort">
                Merge Sort
              </ToggleButton>
            </ToggleButtonGroup>
            {/* <ToggleButtonGroup
              className="toggle-group"
              orientation="vertical"
              value={sortingAlgorithm}
              exclusive
              onChange={setSortingAlgorithm}
              aria-label="Choose Sorting Algorithm"
            >
              <ToggleButton value="quick" aria-label="quick sort">
                Quick Sort
              </ToggleButton>
              <ToggleButton value="some" aria-label="some sort">
                Some Sort
              </ToggleButton>
            </ToggleButtonGroup> */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
