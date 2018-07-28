import { types } from "./constants";
import firebase from '../../firebase';
import {actions as ajaxActions} from '../ajax/actions';
function addParentAccountToFirebase(account) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      const { name, address, cartID, username, password } = account;
      firebase.database().ref('parentAccounts')
        .push({ name, address, cartID, username, password }).then(result => {
          dispatch(actions.addParentAccountSuccess(account));
          resolve(resolve);
        }).catch(error => {
          dispatch(actions.addParentAccountError());
          reject(error);
        })
    });
  }
}
function loadParentAccountFromFirebase(account) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      try {
        firebase.database().ref('parentAccounts').on('value', snap => {
          var accounts = [];
          snap.forEach(account => {
            const { name, address, username, cartID} = account.val();
            accounts.push({ name, address, username, cartID });
          })
          console.log()
          dispatch(actions.setParentAccountsSuccess(accounts));
          resolve();
        });
      } catch(error) {
        dispatch(actions.setParentAccountsError());
        reject(error);
      }
    });
  }
}

export const actions = {
  addParentAccountSuccess: (account, content) => ({
    type: types.ADD_PARENT_ACCOUNT_SUCCESS,
    payload: { account, content }
  }),
  addParentAccountError: ( content) => ({
    type: types.ADD_PARENT_ACCOUNT_ERROR,
    payload: { content }
  }),
  setParentAccountsSuccess: (accounts, content) => ({
    type: types.SET_PARENT_ACCOUNTS_SUCCESS,
    payload: { accounts, content }
  }),
  setParentAccountsError: (content) => ({
    type: types.SET_PARENT_ACCOUNTS_ERROR,
    payload: { content }
  }),
  addParentAccountToFirebase,
  loadParentAccountFromFirebase
};