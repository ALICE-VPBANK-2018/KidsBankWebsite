import * as types from './constants';

const initialState = {
  isAjaxLoading: false,
}
function actionTypeEndsInProcess(type) {
  return type.substring(type.length - 8) === '_SUCCESS' || type.substring(type.length - 6) === '_ERROR';
}
const ajax = (state = initialState, action) => {
  if (action.type === types.BEGIN_AJAX) {
    return { ...state, isAjaxLoading:  true };
  } else if (actionTypeEndsInProcess(action.type)) {
    return { ...state, isAjaxLoading: false};
  } else return state;
}

export default ajax;