import { MOVE, PLACE, CHANGE_FACING, REPORT } from '../constants/ActionTypes';
import { LEFT, RIGHT } from '../constants/Commands';
import { EAST, FACING_DIRECTIONS, NORTH, SOUTH, WEST } from '../constants/Turtle';
import { turtleInPond, validTurtle } from '../utils/turtleHelper';

function calculateFacing(facing, turnDirection) {
  const currentIndex = FACING_DIRECTIONS.indexOf(facing);
  let nextDirection;

  switch (turnDirection) {
    case LEFT:
      nextDirection = currentIndex - 1;
      return nextDirection === -1 ?
        [...FACING_DIRECTIONS].pop() :
        FACING_DIRECTIONS[nextDirection];
    case RIGHT:
      nextDirection = currentIndex + 1;
      return nextDirection === FACING_DIRECTIONS.length ?
        [...FACING_DIRECTIONS].shift() :
        FACING_DIRECTIONS[nextDirection];
    default:
      return facing;
  }
}

function calculateOffset(position, facing, bounds) {
  const {x,y} = position;
  const {boundX, boundY} = bounds;

  switch (facing) {
    case NORTH:
      return { ...position, y: (y + 1 >= boundY ? y : y + 1) };
    case SOUTH:
      return { ...position, y: (y - 1 < 0 ? y : y - 1) };
    case WEST:
      return { ...position, x: (x - 1 < 0 ? x : x - 1) };
    case EAST:
      return { ...position, x: (x + 1 >= boundX ? x : x + 1) };
    default:
      return position;
  }
}

export function placeTurtle(x, y, facing) {
  return {
    type: PLACE,
    x: parseInt(x, 10),
    y: parseInt(y, 10),
    facing
  };
}

export function moveTurtle(x, y, facing, boundX, boundY) {
  return {
    type: MOVE,
    ...calculateOffset({x, y}, facing, {boundX, boundY})
  };
}

export function rotateTurtle(facing, direction) {
  return {
    type: CHANGE_FACING,
    facing: calculateFacing(facing, direction)
  };
}

export function reportTurtle() {
  return {
    type: REPORT
  }
}

export function sendCommand(command) {
  return (dispatch, getState) => {
    const {turtle} = getState();
    const {x: currentX, y: currentY, facing: currentFacing, boundX, boundY} = turtle;
    const turtleIsValid = validTurtle(turtle);

    switch (true) {
      case command.startsWith(PLACE):
        const [x, y, facing] = command.replace(PLACE, '').trim().split(' ').map(item => item.trim());
        const turtleToPlace = {x, y, facing, boundX, boundY};

        if (validTurtle(turtleToPlace) && turtleInPond(turtleToPlace)) {
          dispatch(placeTurtle(x, y, facing));
        }
        break;
      case command.startsWith(MOVE):
        if (turtleIsValid) {
          dispatch(moveTurtle(currentX, currentY, currentFacing, boundX, boundY));
        }
        break;
      case command.startsWith(LEFT) || command.startsWith(RIGHT):
        if (turtleIsValid) {
          dispatch(rotateTurtle(currentFacing, command));
        }
        break;
      case command.startsWith(REPORT):
        if (turtleIsValid) {
          dispatch(reportTurtle());
        }
        break;
      default:
        dispatch({
          type: command
        });
        break;
    }
  }
}