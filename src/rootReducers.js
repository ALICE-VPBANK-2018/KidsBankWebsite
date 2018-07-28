import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import ajax from './reducers/ajax';
import parentAccount from './reducers/parentAccount';
import childrenAccount from './reducers/childrenAccount';
import transaction from './reducers/transaction';
const rootReducer = combineReducers({
  router: routerReducer,
  ajax,
  parentAccount,
  childrenAccount,
  transaction
});
export default rootReducer;