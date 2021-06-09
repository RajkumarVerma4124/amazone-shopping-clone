import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5fc9Sg7DHpO9w130broJjEKvbOu5Ntkw",
    authDomain: "shopping-clone-d7f74.firebaseapp.com",
    projectId: "shopping-clone-d7f74",
    storageBucket: "shopping-clone-d7f74.appspot.com",
    messagingSenderId: "704031453751",
    appId: "1:704031453751:web:38feab6131536b221e45b2",
    measurementId: "G-1Q9Y4SJ1BY"
};


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore()

export default db