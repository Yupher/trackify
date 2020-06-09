import React, { useEffect, useContext} from 'react';
import queryString from 'query-string';
import FavorateTrack from '../tracks/FavorateTrack';
import FavorateArtist from '../tracks/FavorateArtist';
import FavoratePlaylist from '../tracks/FavoratePlaylist';
import Recomended from '../tracks/Recomended';
import './Home.css';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
  const { loadUser, refreshToken, login } = useContext(AuthContext);

  useEffect(
    () => {
      if (window.location.search !== '') {
        const parsed = queryString.parse(window.location.search);
        console.log(parsed);
        //let token = parsed.access_token;
        login(parsed);
      }
    },
    // eslint-disable-next-line
    []
  );
  useEffect(
    () => {
      loadUser();
    },
    // eslint-disable-next-line
    []
  );
  const refreshbrowser = () => {
    window.location = `https://yupher-spotify-oauth.herokuapp.com/refresh?refresh_token=${refreshToken}`;
  };
  setInterval(() => {
    refreshbrowser()
  }, 2700000);
  //
  return (
    <div className="home">
      <FavorateTrack />
      <FavorateArtist />
      <FavoratePlaylist />
      <Recomended />
    </div>
  );
};

export default Home;
