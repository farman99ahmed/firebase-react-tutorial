import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { BiCommentDetail } from 'react-icons/bi';
import { FaDatabase, FaUndoAlt } from 'react-icons/fa';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CreateNewBlog from '../services/blog/CreateNewBlog';
import Alert from 'react-bootstrap/Alert';
import { FiAlertTriangle } from 'react-icons/fi';
import { MdCheckCircle } from 'react-icons/md';

const CreateBlog = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [cover, setCover] = useState(null)
    const [loading, setLoading] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!(title && content)) {
            setError('All fields are required.');
            setLoading(false);
        } else {
            const response = await CreateNewBlog(currentUser.email, title, content, cover);
            if ("error" in response) {
                setError(response.error);
                setLoading(false);
            } else {
                setSuccess(`New blog created with ID: ${response.id}`)
                setLoading(false);
                setTitle('');
                setContent('');
            }
        }
    }
    return (
        <Container className="bg-dark rounded-3 text-white">
            <Row className="justify-content-md-center my-5 p-5">
            <Row className="px-4">
                    { error && <Alert variant="danger"><FiAlertTriangle /> <strong>{error} </strong></Alert> }
                    { success && <Alert variant="success"><MdCheckCircle /> <strong>{success} </strong></Alert> }
                    </Row>
                <h1 className="display-5 fw-bold p-2">
                    <BiCommentDetail /> Create a blog..</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Blog Author" className="text-dark">
                            <Form.Control type="text" placeholder="Blog Author" value={currentUser.email} readOnly />
                        </FloatingLabel>
                    </Form.Group>                    
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Blog Title"  className="text-dark">
                            <Form.Control type="text" placeholder="Blog Title" id="title" name="title" value={title}
                                onChange={(e)=> {setTitle(e.target.value)}}/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Blog Content"  className="text-dark">
                            <Form.Control as="textarea" style={{height: '200px'}} placeholder="Blog Content"
                                id="content" name="content" value={content} onChange={(e)=>
                                {setContent(e.target.value)}} />
                        </FloatingLabel>
                    </Form.Group>                    
                    <Form.Group className="mb-3">
                    <label>Blog Cover</label>
                            <Form.Control type="file" placeholder="Blog Cover"
                                id="cover" name="cover" onChange={(e)=>
                                {setCover(e.target.files[0])}} />
                    </Form.Group>
                    <Button variant="outline-warning" type="submit" size="lg" disabled={loading}>
                        <FaDatabase /> {loading ? "Submitting" : "Submit"}
                    </Button>                    
                    <Button variant="outline-light" type="reset" size="lg" disabled={loading} className="mx-2" onClick={() => {
                        setTitle('');
                        setContent('');
                        setCover('');
                    }}>
                        <FaUndoAlt /> Reset
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default CreateBlog;