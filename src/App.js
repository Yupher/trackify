import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Landing from './components/pages/Landing';
import About from './components/pages/About';
import Blog from './components/pages/Blog';
import setAuthToken from './utils/setAuthToken';
import AuthState from './context/auth/AuthState';
import './App.css';
import TracksState from './context/tracks/TracksState'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <TracksState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path='/landing' component={Landing} />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </TracksState>
    </AuthState>
  );
}

export default App;
