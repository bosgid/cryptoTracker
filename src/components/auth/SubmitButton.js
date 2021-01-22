
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Button from '../Button';

const SubmitButton = ({ email, password, buttonText, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Helper function that executes on form submission
  const handleSubmit = async (email, password) => {
    setIsLoading(true);
    await onSubmit(email.trim(), password.trim());
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      { 
      // Disable 'Add' button if crypto data is still being fetched or if nothing has been typed yet
      (email === '' || password === '') ? (
        <>
          <Button title={buttonText} disable={true}/>
        </>
        ) : (
          // Switch to loading spinner while handling submission
          isLoading ? (
            <>
              <Button title={''} disable={true}/>
              <ActivityIndicator size='small' color='black' style={{ marginTop: -35}}/>
            </>
          ) : (
            <Button title={buttonText} onPress={() => handleSubmit(email, password)} disable={false}/>
          )
        )
      }
    </View>
  )  
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    marginBottom: 15
  },
})

export { SubmitButton };