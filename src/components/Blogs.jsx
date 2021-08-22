import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import { FaComments, FaComment, FaUserEdit } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import image from '../assets/image.jpeg';
import GetBlogs from '../services/blog/GetBlogs';

const Blogs = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [blogs, setBlogs]= useState(null);
    const [loading, setLoading] = useState(false);

    const getAllBlogs = async (e, value) => {
        e.preventDefault();
        setLoading(true);
        const response = await (value ? GetBlogs(currentUser.email) : GetBlogs())
        if ("error" in response) {
            alert(response.error);
            setLoading(false);
        } else {
            setBlogs(response)
            setLoading(false);
        }
    }

    return (
    <>
        <Container className="bg-dark rounded-3 text-white">
            <Row className="justify-content-md-center my-5 p-5">
                <h1 className="display-4 fw-bold p-2 text-center">Welcome, {currentUser.displayName}</h1>
                <h1 className="display-6 p-2 text-center">{currentUser.email}</h1>
                <Row>
                    <Col md={6}>
                    <Button variant="outline-warning" className="w-100 my-5 p-1" size="lg" onClick={getAllBlogs} disabled={loading}>
                        <FaComments /> {loading ? "Loading" : "Show all blogs"}
                    </Button>
                    </Col>
                    <Col md={6}>
                    <Button variant="outline-warning" className="w-100 my-5 p-1" size="lg" onClick={(e) => getAllBlogs(e,true)} disabled={loading}>
                        <FaComment /> {loading ? "Loading" : "Show my blogs"}
                    </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
        <Container>
            <Row>
                {blogs && blogs.map(blog => {
                    return (
                        <Col md={3} key={blog.id}>
                        <Card bg="dark" text="light" className="mb-2" key={blog.id}>
                            <Card.Img variant="top" src={blog.downloadURL || image} height={160} width={275} />
                            <Card.Header><FaUserEdit /> {blog.author}</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <FaComment/> {blog.title} </Card.Title>
                                <Card.Text>{blog.content}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small className="text-muted"><MdDateRange /> {blog.createdAt}</small>
                            </Card.Footer>
                        </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    </>
    )
}

export default Blogs;