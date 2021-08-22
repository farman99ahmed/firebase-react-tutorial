import firebase from "firebase/app";

const FirebaseConfig = {
    apiKey: "AIzaSyCPO6azeuAo0omplzXWDdC-qbYg4yjClgU",
    authDomain: "fir-tutorial-8d5af.firebaseapp.com",
    projectId: "fir-tutorial-8d5af",
    storageBucket: "fir-tutorial-8d5af.appspot.com",
    messagingSenderId: "927448682664",
    appId: "1:927448682664:web:64c625cde9a2c9fbdbf29d"
};

let instance;

const getFirebaseInstance = () => {
    if (instance) {
        return instance;
    } else {
        instance = firebase.initializeApp(FirebaseConfig);
        return instance;
    }
}

export default getFirebaseInstance;

