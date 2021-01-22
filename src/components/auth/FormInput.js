
import React from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';

const FormInput = ({ title, value, onChangeText, placeholder, isSecure }) => {

  return (
    <>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          // Highlight text-input border when something is typed 
          value === '' ? { borderColor: 'grey' } : { borderColor: '#FBD24D' }
          ]}
        placeholder={placeholder}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={isSecure}
      />
    </>
  )

}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    height: 50,
    padding: 10,
    marginBottom: 20,
  },
})

export { FormInput };