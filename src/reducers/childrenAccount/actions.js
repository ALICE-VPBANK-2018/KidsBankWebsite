import { types } from "./constants";
import firebase from '../../firebase';
import {actions as ajaxActions} from '../ajax/actions';

function addChildrenAccountToFirebase(account) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      const { name, username, password, DOB, parentUsername} = account;
      firebase.database().ref('childrenAccounts')
        .push({ name, username, password, DOB, parentUsername} ).then(result => {
          console.log(result);
          dispatch(actions.addChildrenAccountSuccess(account));
          resolve(resolve);
        }).catch(error => {
          dispatch(actions.addChildrenAccountError());
          reject(error);
        })
    });
  }
}

function loadChildrenAccountFromFirebase(account) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      try {
        
        firebase.database().ref('childrenAccounts').on('value', snap => {
          var accounts = [];
          snap.forEach(account => {
            const { name, username, DOB, parentUsername}= account.val();
            accounts.push({ name, username, DOB, parentUsername });
          })
          console.log()
          dispatch(actions.setChildrenAccountsSuccess(accounts));
          resolve();
        });
      } catch(error) {
        dispatch(actions.setChildrenAccountsError());
        reject(error);
      }
    });
  }
}
function loadChildrenAccountByParentFromFirebase(parentUser) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      try {
        firebase.database().ref('childrenAccounts').orderByChild('parentUsername')
        .equalTo(parentUser).on('value', snap => {
          var accounts = [];
          snap.forEach(account => {
            const { name, username, DOB, parentUsername}= account.val();
            accounts.push({ name, username, DOB, parentUsername });
          })
          console.log(accounts);
          dispatch(actions.setChildrenAccountsSuccess(accounts));
          resolve();
        });
      } catch(error) {
        console.log(error);
        dispatch(actions.setChildrenAccountsError());
        reject(error);
      }
    });
  }
}

export const actions = {
  addChildrenAccountSuccess: (account, content) => ({
    type: types.ADD_CHILDREN_ACCOUNT_SUCCESS,
    payload: { account, content }
  }),
  addChildrenAccountError: (content) => ({
    type: types.ADD_CHILDREN_ACCOUNT_ERROR,
    payload: { content }
  }),
  setChildrenAccountsSuccess: (accounts, content) => ({
    type: types.SET_CHILDREN_ACCOUNTS_SUCCESS,
    payload: { accounts, content }
  }),
  setChildrenAccountsError: (content) => ({
    type: types.SET_CHILDREN_ACCOUNTS_ERROR,
    payload: { content }
  }),
  addChildrenAccountToFirebase,
  loadChildrenAccountFromFirebase,
  loadChildrenAccountByParentFromFirebase
};