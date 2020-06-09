import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [burger, setBurger] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const clickLogin = () => {
    window.location = 'https://yupher-spotify-oauth.herokuapp.com/login ';
  };

  const onLogout = ()=>{
    logout()
  }
  const onToggle = () => {
    setBurger(!burger);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <h1>Trackify</h1>
        </Link>
      </div>

      <ul className={`nav-links ${burger ? 'nav-active' : ''}`}>
        {isAuthenticated ? (
          <li className={`${burger ? 'navAnimation1' : ''}`}>
            <i className="fab fa-spotify"></i>
            <a href="https://open.spotify.com"> Web Player</a>
          </li>
        ) : (
          <li
            className={`${burger ? 'navAnimation1' : ''}`}
            onClick={clickLogin}
          >
            <i className="fab fa-spotify"></i> Login With Spotify
          </li>
        )}

        <li className={`${burger ? 'navAnimation2' : ''}`}>
          <Link to="/about">About</Link>
        </li>
        <li className={`${burger ? 'navAnimation3' : ''}`}>
          <Link to="/blog">Blog</Link>
        </li>
        {isAuthenticated && (
          <li className={`${burger ? 'navAnimation3' : ''}`}>
            <a href="/landing" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i> Lougout
            </a>
          </li>
        )}
      </ul>

      <div className={`burger ${burger && 'toggle'}`} onClick={onToggle}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
