import { types } from "./constants";
import firebase from '../../firebase';
import {actions as ajaxActions} from '../ajax/actions';

function addTransactionToFirebase(transaction) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      const { username, type, amount, date, content, target} = transaction;
      console.log(transaction);
      firebase.database().ref('transactions')
        .push({ username, type, amount, date, content, target} ).then(result => {
          console.log(result);
          dispatch(actions.addTransactionSuccess(transaction));
          resolve(resolve);
        }).catch(error => {
          console.log(error);
          dispatch(actions.addTransactionError());
          reject(error);
        })
    });
  }
}

function loadTransactionsFromFirebase(transaction) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      try {
        firebase.database().ref('transactions').on('value', snap => {
          var transactions = [];
          snap.forEach(transaction => {
            const { username, type, amount, date, content, target}  = transaction.val();
            transactions.push({ username, type, amount, date, content, target });
          })
          console.log()
          dispatch(actions.setTransactionsSuccess(transactions));
          resolve();
        });
      } catch(error) {
        dispatch(actions.setTransactionsError());
        reject(error);
      }
    });
  }
}
function loadTransactionsFromFirebase() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      try {
        firebase.database().ref('transactions').on('value', snap => {
          var transactions = [];
          console.log(snap);
          snap.forEach(transaction => {
            const { username, type, amount, date, content, target}  = transaction.val();
            transactions.push({ username, type, amount, date, content, target });
          })
          console.log(transactions);
          dispatch(actions.setTransactionsSuccess(transactions));
          resolve();
        });
      } catch(error) {
        dispatch(actions.setTransactionsError());
        reject(error);
      }
    });
  }
}

function loadTransactionsByUsernameFromFirebase(username) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(ajaxActions.beginAjax());
      try {
        firebase.database().ref('transactions').orderByChild('username')
        .equalTo(username).on('value', snap => {
          var transactions = [];
          console.log(snap);
          snap.forEach(transaction => {
            const { username, type, amount, date, content, target}  = transaction.val();
            transactions.push({ username, type, amount, date, content, target });
          })
          console.log(transactions);
          dispatch(actions.setTransactionsSuccess(transactions));
          resolve();
        });
      } catch(error) {
        dispatch(actions.setTransactionsError());
        reject(error);
      }
    });
  }
}

export const actions = {
  addTransactionSuccess: (transaction, content) => ({
    type: types.ADD_TRANSACTION_SUCCESS,
    payload: { transaction, content }
  }),
  addTransactionError: ( content) => ({
    type: types.ADD_TRANSACTION_ERROR,
    payload: { content }
  }),
  setTransactionsSuccess: (transactions, content) => ({
    type: types.SET_TRANSACTIONS_SUCCESS,
    payload: { transactions, content }
  }),
  setTransactionsError: (content) => ({
    type: types.SET_TRANSACTIONS_ERROR,
    payload: { content }
  }),
  addTransactionToFirebase,
  loadTransactionsFromFirebase,
  loadTransactionsByUsernameFromFirebase
};