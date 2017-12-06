import { PLACE, CHANGE_FACING, MOVE, REPORT } from '../constants/ActionTypes';
import InitialState from '../constants/InitialState';

export default (state = InitialState, action) => {
  switch (action.type) {
    case PLACE:
      return { ...state, x: action.x, y: action.y, facing: action.facing };
    case MOVE:
      return { ...state, x: action.x, y: action.y };
    case CHANGE_FACING:
      return { ...state, facing: action.facing };
    case REPORT:
      return { ...state, status: `${state.x},${state.y},${state.facing}`};
    default:
      return state;
  }
};