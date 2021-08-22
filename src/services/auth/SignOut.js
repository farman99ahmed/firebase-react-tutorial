import "firebase/auth";
import FirebaseInstance from '../../config/FirebaseConfig';

const SignOut = async () => {
    try {
        await FirebaseInstance().auth().signOut();
        return true;
    } catch (error) {
        return ({
            error: error.message
        })
    }
}

export default SignOut;