import "firebase/auth";
import FirebaseInstance from '../../config/FirebaseConfig';

const EmailSignIn = async (email, password) => {
    try {
        const response = await FirebaseInstance().auth().signInWithEmailAndPassword(email, password);
        return response.user;
    } catch (error) {
        return ({
            error: error.message
        })
    }
}

export default EmailSignIn;