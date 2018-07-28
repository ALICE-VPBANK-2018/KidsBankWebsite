import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDYTt2iPemQ_2cCmKH6R6dJRrpIUADfco0",
  authDomain: "kidsbank-vpbank.firebaseapp.com",
  databaseURL: "https://kidsbank-vpbank.firebaseio.com",
  projectId: "kidsbank-vpbank",
  storageBucket: "kidsbank-vpbank.appspot.com",
  messagingSenderId: "424560182192"
};
firebase.initializeApp(config);

export default firebase;