import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import NavigationBar from './components/Navbar';
import Register from './components/Register';
import CreateBlog from './components/CreateBlog';
import Blogs from './components/Blogs';
import AuthContext from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({ displayName: null, email: null, uid: null });
  const value = {currentUser, setCurrentUser}

  return (
      <AuthContext.Provider value={value}>
        <Router>
          <NavigationBar />
          <Switch>
            <PrivateRoute exact path="/" component={Blogs} />
            <PrivateRoute path="/createblog" component={CreateBlog} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </AuthContext.Provider>
  );
}

export default App; 
