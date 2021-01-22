
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchInput = ({ text, onChangeText, placeholder }) => {

  return (
    <TextInput
      value={text}
      onChangeText={onChangeText}
      style={[
        styles.input,
        // Highlight text-input border when something is typed 
        text === '' ? { borderColor: 'grey' } : { borderColor: '#FBD24D' }
        ]}
      placeholder={placeholder}
    />
  )  
}

const styles = StyleSheet.create({
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

export { SearchInput };