import React, { useReducer } from 'react';
import axios from 'axios';

import { LOGIN_SUCCESS, LOGOUT, LOAD_USER, AUTH_ERROR } from '../types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
     let res= await  axios.get('https://api.spotify.com/v1/me') 
      if(res.status !== 200){
        let newToken = localStorage.refreshToken
        window.location = 'https://yupher-spotify-oauth.herokuapp.com/refresh?refresh_token='+ newToken
      }
      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  const login = async (parsed) => {
   
     if(parsed){
      dispatch({
        type: LOGIN_SUCCESS,
        payload: parsed,
      }); 
     loadUser();
    }else{
      dispatch({
        type:AUTH_ERROR
      })
    } 
      
    
  };
  const logout = ()=>{
    dispatch({
      type: LOGOUT
    })
  }
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        loadUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
