import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { SiFirebase } from 'react-icons/si';
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { FaComment } from 'react-icons/fa';
import SignOut from '../services/auth/SignOut';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NavigationBar = (props) => {

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    const response = await SignOut();
    console.log(response);
    if (response) {
        setCurrentUser({
          uid: null,
          email: null,
          displayName: null
      });
    }
  }

 return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <SiFirebase /> React - Firebase Blog</Navbar.Brand>
        <Nav className="me-auto">
        </Nav>
        {currentUser.uid &&
        <>
          <Nav className="p-2">
            <Link to="/">
            <Button variant="outline-warning">
              <ImHome /> Home</Button>
            </Link>
          </Nav>
          <Nav className="p-2">
            <Link to="/createblog">
            <Button variant="outline-warning">
              <FaComment /> Create Blog</Button>
            </Link>
          </Nav>
          <Nav className="p-2">
            <Button variant="outline-warning" onClick={handleSignOut}>
              <GoSignOut /> Sign Out</Button>
          </Nav>
        </>
        }
      </Container>
    </Navbar>
 )   
}

export default NavigationBar;