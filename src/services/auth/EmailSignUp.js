import firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseInstance from '../../config/FirebaseConfig';

const EmailSignUp = async (name, email, password) => {
    try {
        const response = await FirebaseInstance().auth().createUserWithEmailAndPassword(email, password);
        if (response) {
            let user = await response.user.updateProfile({
                displayName: name
            })
            user = firebase.auth().currentUser;
            return user;
        }
    } catch (error) {
        return ({
            error: error.message
        })
    }
}

export default EmailSignUp;