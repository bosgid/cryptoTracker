
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const Button = ({ title, onPress, disable }) => {

  // Display either disabled or active button, depending on 'disable' prop
  {return (disable ? (
      <View style={styles.button}>
        <Text style={[styles.text, { opacity: 0.2 }]}>{title}</Text>
      </View>
    ) : (
      <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
  )};
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FBD24D',
    height: 50,
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16, 
    fontWeight: 'bold',
    opacity: 1,
  }
})

export default Button;