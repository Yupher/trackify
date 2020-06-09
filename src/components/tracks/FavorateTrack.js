import React, { useContext, useEffect, Fragment } from 'react';
import TracksContext from '../../context/tracks/TracksContext';
import './favorateTrack.css'

const FavorateTracks = () => {
  const { favorateTrack, track, loading } = useContext(TracksContext);
  useEffect(
    () => {
      favorateTrack();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="favorate-track grid">
      <h1>Your Favorate Track</h1>
      <p>Most played Track</p>
      {track !== null && !loading ? (
        <Fragment>
          {track.items.map(item => {
            let imgUrl = track.items
              .map(item => item.album.images.filter(img => img.width === 640))
              .map(img => img[0].url);
            return (
              <Fragment key={item.id}>
                <img src={imgUrl} alt="" />
                <div >
                <h3>
                    Artist:{' '}
                    {item.artists.map(artist => (
                      <span key={artist.id}>{artist.name}</span>
                    ))}
                  </h3>
                  <h3>Track: {item.name}</h3>
                  <h3>Album: {item.album.name}</h3>
                  <h3>Popularity: {item.popularity}%</h3>
                  <h3>Release Date: {item.album.release_date}</h3>
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

export default FavorateTracks;
