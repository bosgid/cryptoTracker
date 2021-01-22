
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Button';

const AddButton = ({ isLoading, text, handleSearch }) => {

  return (
    <View style={styles.container}>
      { 
      // Disable 'Add' button if crypto data is still being fetched or if nothing has been typed yet
      (isLoading || text === '')
        ? <Button title='Add' disable={true}/>
        : <Button title='Add' onPress={() => handleSearch(text)} disable={false}/>
      }
    </View>
  )  
}

const styles = StyleSheet.create({
 container: {
  alignItems: 'flex-end'
 }
})

export { AddButton };