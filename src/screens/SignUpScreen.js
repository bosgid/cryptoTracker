
import React, { useContext } from 'react';
import AuthForm from '../components/auth/AuthForm';
import { AuthContext } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
  const { actions: { signUp } } = useContext(AuthContext);

  return (
    <AuthForm 
      buttonText='Sign up' 
      linkText="Already have an account? Sign in instead"
      onSubmit={signUp}
      onTextPress={() => navigation.navigate('Sign in')}
      />
  );
}

export { SignUpScreen };