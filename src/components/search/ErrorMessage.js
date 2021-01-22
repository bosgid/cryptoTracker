
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) => {

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{ message }</Text>
    </View>
  )  
}

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  }
})

export { ErrorMessage };