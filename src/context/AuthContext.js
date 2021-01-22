import React, { useReducer } from 'react';
import firebase from 'firebase';

const AuthContext = React.createContext();

const Reducer = (authState, action) => {
  switch (action.type) {

    case 'authenticated':
        return { ...authState, error: '', isSignedIn: true };

    case 'set_error' :
      return { ...authState, error: action.payload }

    case 'set_auth_state':
      return { ...authState, isSignedIn: action.payload }

    default:
      return authState;
  }
}

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(Reducer, { error: '', isSignedIn: null})

  const signIn = async ( email, password ) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: 'authenticated', payload: { email, password } })
    } catch (err) {
      dispatch({ type: 'set_error', payload: '(Something went wrong with sign in)' })
    }
  }

  const signUp = async ( email, password ) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      dispatch({ type: 'authenticated', payload: { email, password } })
    } catch (err) {
      dispatch({ type: 'set_error', payload: '(Something went wrong with sign up)' })
    }
  }

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      dispatch({ type: 'set_auth_state', payload: false })
    } catch (err) {
      dispatch({ type: 'set_error', payload: '(Something went wrong with sign out)' })
    }
  }

  const setAuthState = (boolean) => {
    dispatch({ type: 'set_auth_state', payload: boolean })
  }

  const resetError = () => {
    dispatch({ type: 'set_error', payload: '' })
  }

  return (
    <AuthContext.Provider value={{ authState, actions: { signIn, signUp, signOut, setAuthState, resetError } }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };