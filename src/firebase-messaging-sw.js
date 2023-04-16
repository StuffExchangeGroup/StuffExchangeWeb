importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyD3Bk4hGzJqaa8SQ6REJWiWg8TKMVgHhi0",
    authDomain: "notification-69f68.firebaseapp.com",
    databaseURL: "https://notification-69f68-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "notification-69f68",
    storageBucket: "notification-69f68.appspot.com",
    messagingSenderId: "773700716215",
    appId: "1:773700716215:web:ba4be7608faefb21016f32",
    measurementId: "G-TCY37984HH"
});
const messaging = firebase.messaging();