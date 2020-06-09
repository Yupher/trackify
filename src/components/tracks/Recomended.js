import React, { Fragment, useContext, useEffect } from 'react';
import TrackesContext from '../../context/tracks/TracksContext';
import './recomended.css';

const Recomended = () => {
  const { artist, track, recomendedTrack, recomended, loading } = useContext(
    TrackesContext
  );
  useEffect(() => {
    if (artist !== null && track !== null) {
      let artistId = artist.items.map(item => item.id).join();
      let trackId = track.items.map(item => item.id).join();
      recomendedTrack(artistId, trackId);
    }
  },
   // eslint-disable-next-line
  [artist, track]);
  return (
    <div className="recomended grid">
      <h1>Recomended For you</h1>
      <p>You May Like This</p>
      {recomended !== null && !loading ? (
        <Fragment>
          {recomended.map(trackData => {
            let imgUrl = trackData.album.images
              .filter(imge => imge.width === 640)
              .map(img => img.url)
              .join();
            return (
              <Fragment key={trackData.id}>
                <img src={imgUrl} alt="" />
                <div>
                  <h3>
                    Artist: {trackData.artists.map(artist => artist.name)}
                  </h3>
                  <h3>Track: {trackData.name}</h3>
                  <h3>Album: {trackData.album.name}</h3>
                  <h3>Popularity: {trackData.popularity}%</h3>
                  <h3>Release Date: {trackData.album.release_date}</h3>
                  <h3>
                    Listen on{' '}
                    <a href={trackData.external_urls.spotify}>Spotify</a>
                  </h3>
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

export default Recomended;
