import React, { useContext, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import TracksContext from '../../context/tracks/TracksContext';
import './favoratePlaylist.css'

const FavoratePlaylist = () => {
  let { user } = useContext(AuthContext);
  let { favoratePlaylist, playlist, loading } = useContext(TracksContext);
  useEffect(() => {
    if (user !== null && user !== undefined) {
      favoratePlaylist(user.id);
      console.log(user.id);
    }
  },
   // eslint-disable-next-line
  [user]);

  return (
    <div className="favorate-playlist grid">
      <h1>Your Favorate Playlist</h1>
      <strong>What makes Spotify great?</strong>
      <p>Yes! Users Playlists</p>
      {playlist !== null && !loading ? (
        <Fragment>
          {playlist.items.map(item => {
            let imgUrl = item.images
              .filter(image => image.width === 640)
              .map(img => img.url)
              .join();

            return (
              <Fragment key={item.id}>
                <img src={imgUrl} alt="" />
                <div>
                  <h3>Name: {item.name}</h3>

                  <span>
                    <h3>Description: </h3>
                    <p>{item.description}</p>
                  </span>

                  <h3>
                    Play it on <a href={item.external_urls.spotify}>Spotify</a>
                  </h3>
                </div>
              </Fragment>
            );
          })}
        </Fragment>
      ) : (
        <div>
          <h3>Loading...</h3>
        </div>
      )}
    </div>
  );
};

export default FavoratePlaylist;
