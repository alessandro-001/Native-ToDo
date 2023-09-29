import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJ5F4QDyQaxRcNbIOIzSziJzmwVXqShZ8",
    authDomain: "todo-app-55a82.firebaseapp.com",
    projectId: "todo-app-55a82",
    storageBucket: "todo-app-55a82.appspot.com",
    messagingSenderId: "826113169987",
    appId: "1:826113169987:web:42900cb7b9ba1cfb4352f6"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);