
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';

const LinkText = ({ text, onPress, textSize, isLoading }) => {

  {return isLoading ? (
    <ActivityIndicator size='large' color='#203142' style={{ marginTop: 50 }}/>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View style={styles(textSize).container}>
        <Text style={styles(textSize).text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )};
}

const styles = (textSize) => StyleSheet.create({
  container: {
    marginVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: textSize, 
    color: '#203142'
  }
})

export default LinkText;