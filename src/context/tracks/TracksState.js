import React, { useReducer } from 'react';
import axios from 'axios';
import TracksReducer from './TracksReducer';
import TracksContext from './TracksContext';
import {
  FAVORATE_TRACK,
  FAVORATE_ARTIST,
  FAVORATE_PLAYLIST,
  RECOMENDED,
} from '../types';

const TracksState = props => {
  const initialState = {
    track: null,
    artist: null,
    playlist: null,
    recomended: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(TracksReducer, initialState);
  const favorateTrack = async () => {
    try {
      const res = await axios.get(
        'https://api.spotify.com/v1/me/top/tracks?limit=1'
      );
      dispatch({
        type: FAVORATE_TRACK,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const favorateArtist = async () => {
    try {
      const res = await axios.get(
        'https://api.spotify.com/v1/me/top/artists?limit=1'
      );
      dispatch({
        type: FAVORATE_ARTIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const favoratePlaylist = async (userId) =>{
    try {
     let res = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists?offset=1&limit=1`) 
     
     dispatch({
       type: FAVORATE_PLAYLIST,
       payload: res.data
     })
    } catch (error) {
      console.log(error)
    }
  }

  const recomendedTrack = async (artistSeed, trackSeed) =>{
    const res = await axios.get(`https://api.spotify.com/v1/recommendations?seed_artists=${artistSeed}&seed_tracks=${trackSeed}&limit=1`)
    console.log(res.data.tracks)
    dispatch({
      type: RECOMENDED,
      payload: res.data.tracks
    })
  }
  return (
    <TracksContext.Provider
      value={{
        track: state.track,
        artist: state.artist,
        playlist: state.playlist,
        recomended: state.recomended,
        loading: state.loading,
        favorateTrack,
        favorateArtist,
        favoratePlaylist,
        recomendedTrack
      }}
    >
      {props.children}
    </TracksContext.Provider>
  );
};

export default TracksState;
