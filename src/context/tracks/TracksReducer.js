import {
  FAVORATE_TRACK,
  FAVORATE_ARTIST,
  FAVORATE_PLAYLIST,
  RECOMENDED,
} from '../types';

export default (state, action) =>{
  switch(action.type){
    case RECOMENDED:
      return{
        ...state,
        loading: false,
        recomended: action.payload
      }
    case FAVORATE_PLAYLIST:
      return{
        ...state,
        loading: false,
        playlist: action.payload
      }
    case FAVORATE_ARTIST:
      return{
        ...state,
        loading: false,
        artist: action.payload
      }
    case FAVORATE_TRACK:
      return{
        ...state,
        loading: false,
        track: action.payload
      }
    default:
      return state
  }
}