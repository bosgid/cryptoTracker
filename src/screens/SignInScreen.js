
import React, { useContext } from 'react';
import AuthForm from '../components/auth/AuthForm';
import { AuthContext } from '../context/AuthContext';

const SignInScreen = ({ navigation }) => {
  const { actions: { signIn } } = useContext(AuthContext);

  return (
    <AuthForm 
      buttonText='Sign in' 
      linkText="Don't have an account? Sign up instead"
      onSubmit={signIn}
      onTextPress={() => navigation.navigate('Sign up')}
      />
  );
}

export { SignInScreen };