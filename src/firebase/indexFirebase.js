import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBTTlD074NZ4LJZpzAkvPGE8BgS0lHU-Ok",
    authDomain: "petproject-shop.firebaseapp.com",
    projectId: "petproject-shop",
    storageBucket: "petproject-shop.appspot.com",
    messagingSenderId: "1098551162424",
    appId: "1:1098551162424:web:fba1af044ff5ff94ae58cd"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default db