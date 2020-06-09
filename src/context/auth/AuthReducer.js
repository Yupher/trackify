import { LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, AUTH_ERROR, LOGOUT } from '../types';

export default (state, action)=>{
  switch(action.type){
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.access_token)
      localStorage.setItem('refreshToken', action.payload.refresh_token)
      return{
        ...state,
        token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        user: action.payload.user,
        loading: false,
        isAuthenticated: true,
      }
    default:
      return state
  }
}