
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CurrencyTitle = ({ name, symbol }) => {

  return (
    <View style={{ marginLeft: -10 }}>  
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.symbol}>{symbol}</Text>
    </View>
  )  
}

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    color: '#203142',
  },
  symbol: {
    color: '#203142',
  },
})

export { CurrencyTitle };