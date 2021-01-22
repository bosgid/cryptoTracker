
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';


const CurrencyData = ({ usd_value, change_24hr }) => {

  return (
    <View style={styles.container}>

      <Text style={styles.usd}>{usd_value}</Text>

      <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
        { // Format % change_24hr value, depending on positive or negative value (i.e. increase/decrease)
        change_24hr > 0
          ? ( <>
                <Feather style={styles.changePositive} name='arrow-up-right' size={18}/>
                <Text style={styles.changePositive}>{change_24hr}%</Text> 
              </> )
          : ( <>
                <Feather style={styles.changeNegative} name='arrow-down-left' size={18}/>
                <Text style={styles.changeNegative}>{change_24hr * -1}%</Text> 
              </> )
        }
      </View>
    </View>
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginRight: 20
  },
  usd: {
    fontWeight: 'bold',
    color: '#203142',
    alignSelf: 'flex-end',
  },
  changePositive: {
    alignSelf: 'flex-end',
    color: 'green',
  },
  changeNegative: {
    alignSelf: 'flex-end',
    color: 'red',
  },
})

export { CurrencyData };