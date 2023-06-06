import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDiTosInmNp7bud4eiNdoVC0R395Wy_am4",
    authDomain: "health-way-5ba4d.firebaseapp.com",
    projectId: "health-way-5ba4d",
    storageBucket: "health-way-5ba4d.appspot.com",
    messagingSenderId: "523953028093",
    appId: "1:523953028093:web:64d467f03985bcca1d3794"
};

const app = initializeApp(firebaseConfig, 'health-way');

export const auth = getAuth(app);

export const db = getFirestore(app);