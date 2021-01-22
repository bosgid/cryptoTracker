import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { FormInput, SubmitButton, ErrorMessage } from '../auth';
import LinkText from '../LinkText';

const AuthForm = ({ buttonText, linkText, onSubmit, onTextPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authState, actions: { resetError } } = useContext(AuthContext);

  const onChangeEmail = (email) => {
    setEmail(email);
    resetError();
  }

  const onChangePassword = (password) => {
    setPassword(password);
    resetError();
  }
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
    resetError();
    onTextPress();
  }

  return (
    <View style={styles.container}>

      <FormInput 
        title='Email'
        value={email}
        onChangeText={onChangeEmail}
        placeholder='email@email.com'
        isSecure={false}
      />

      <FormInput 
        title='Password'
        value={password}
        onChangeText={onChangePassword}
        placeholder='(6 characters or more)'
        isSecure={true}
      />

      <SubmitButton 
        email={email} 
        password={password} 
        buttonText={buttonText} 
        onSubmit={onSubmit}
      />

      <ErrorMessage message={authState.error} />

      <LinkText 
        text={linkText}
        onPress={() => resetForm()}
        textSize={14}
        isLoading={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  button: {
    alignSelf: 'flex-end',
    width: 150,
    height: 100,
    borderWidth: 1,
  },
})

export default AuthForm;