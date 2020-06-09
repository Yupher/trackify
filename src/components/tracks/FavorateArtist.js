import React, { useContext, useEffect, Fragment } from 'react';
import TracksContext from '../../context/tracks/TracksContext';
import './favorateArtist.css'
const FavorateArtist = () => {
  let { favorateArtist, artist, loading } = useContext(TracksContext);
  useEffect(() => {
    favorateArtist();
  },
  // eslint-disable-next-line
   []);
  
  return (
    <div className="favorate-artist grid">
      <h1>Your Favorate Artist</h1>
      <p>The Artist that inspires you the most</p>
      {artist !== null && !loading ? (
        <Fragment>
          {artist.items.map(item => {
            let imgUrl = artist.items
              .map(item => item.images.filter(img => img.width === 640))
              .map(img => img[0].url);
            return (
              <Fragment key={item.id}>
                <img src={imgUrl} alt="" />
                <div>
                  <h3>Name: {item.name}</h3>
                  <h3>Followers: {item.followers.total}</h3>
                  <h3>Popularity: {item.popularity}%</h3>
                  <h3>
                    Profile: <a href={item.external_urls.spotify}>Spotify</a>
                  </h3>
                  <h3>Genres: {item.genres.join(', ')}</h3>
                </div>
              </Fragment>
            );
          })}
        </Fragment>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default FavorateArtist;
