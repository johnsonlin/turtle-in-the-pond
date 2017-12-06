import { FACING_DIRECTIONS } from '../constants/Turtle';

export const validTurtle = (turtle) => {
  const {x, y, facing} = turtle;
  return x >= 0 && y >= 0 && FACING_DIRECTIONS.includes(facing);
};

export const turtleInPond = (turtle) => {
  const {x, y, boundX, boundY} = turtle;

  return x >=0 && x < boundX && y >= 0 && y < boundY;
};