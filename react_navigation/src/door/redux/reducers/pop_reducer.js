import { actionTypes } from '../../config';

const initState = {
  pop: null,
  leftConfirm: () => {},
  rightConfirm: () => {},
  leftContent: null,
  rightContent: null
};

export default (_, action = {}) => {
  const { type, data } = action;
  if (type === actionTypes.SHOW_POP) {
    return data;
  }
  return initState;
};
