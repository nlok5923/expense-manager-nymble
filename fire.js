const firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyDt-S90tQUFUCQQW_0I0PfUU1vz-XOrZd8",
    authDomain: "expense-c879f.firebaseapp.com",
    projectId: "expense-c879f",
    storageBucket: "expense-c879f.appspot.com",
    messagingSenderId: "813328062502",
    appId: "1:813328062502:web:ee11e180a500ba2d506ee7"
  };

  let app;
  if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app();
  }

module.exports = app;
