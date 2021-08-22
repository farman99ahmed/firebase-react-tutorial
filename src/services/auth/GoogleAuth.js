import firebase from "firebase/app";
import "firebase/auth";
import FirebaseInstance from '../../config/FirebaseConfig';

const provider = new firebase.auth.GoogleAuthProvider();

const GoogleAuth = async () => {
    try {
        const response = await FirebaseInstance().auth().signInWithPopup(provider);
        return response.user;
    } catch (error) {
        return ({
            error: error.message
        })
    }
}

export default GoogleAuth;