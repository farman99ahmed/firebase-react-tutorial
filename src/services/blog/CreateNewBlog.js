import FirebaseInstance from '../../config/FirebaseConfig';
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const CreateNewBlog = async (author, title, content, cover) => {
    try {

        let response;
        if (cover) {
            const uploadTask = await FirebaseInstance().storage().ref('blog').child('cover/' + uuidv4()).put(cover);
            response = await FirebaseInstance().firestore().collection('blogs').add({
                author,
                title,
                content,
                downloadURL: await uploadTask.ref.getDownloadURL(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        } else {
            response = await FirebaseInstance().firestore().collection('blogs').add({
                    author,
                    title,
                    content,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
            }
            return {
                id: response.id
            };
        } catch (error) {
            return ({
                error: error.message
            })
        }
    }

export default CreateNewBlog;