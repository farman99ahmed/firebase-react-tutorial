import FirebaseInstance from '../../config/FirebaseConfig';
import "firebase/firestore";

const GetBlogs = async (author = null) => {
    try {
        let response;
        if (author) {
            response = await FirebaseInstance().firestore().collection('blogs').where("author", "==", author).orderBy('createdAt').get();
        } else {
            response = await FirebaseInstance().firestore().collection('blogs').orderBy('createdAt').get();
        }
        const blogs = response.docs.map(doc => {
            return {
                id: doc.id,
                author: doc.data().author,
                title: doc.data().title,
                content: doc.data().content,
                downloadURL: doc.data().downloadURL || null,
                createdAt: doc.data().createdAt.toDate().toString()
            }
        })
        return blogs;
    } catch (error) {
        return ({
            error: error.message
        })
    }
}

export default GetBlogs;