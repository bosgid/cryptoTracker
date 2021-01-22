import React, { useState, useContext } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DeleteContext } from '../../context/DeleteContext';
import { CurrencyTitle, CurrencyData } from '../info';

const InfoCard = ({ currency }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { deleteList, actions: { addToDeleteList, removeFromDeleteList } } = useContext(DeleteContext);

  const selectOrDeselctItem = () => {
    if (isSelected) {
      setIsSelected(false)
      removeFromDeleteList(currency)
    } else {
      setIsSelected(true)
      addToDeleteList(currency)
    }
  }

  return (
      <TouchableOpacity 
        onPressIn={() => { selectOrDeselctItem() }}
        delayPressIn={ (deleteList.length === 0) ? 350 : 0}
        style={[
          styles.container,
          isSelected ? { backgroundColor: '#EEEEEE' } : { backgroundColor: 'white' }
        ]}
      >

        <Image
          style={styles.icon}
          source={{ uri: currency.icon_link }}
        />

        <CurrencyTitle name={currency.name} symbol={currency.symbol}/>

        <CurrencyData 
          usd_value={currency.usd_value} 
          change_24hr={currency.change_24hr}
        />

      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  icon: {
    margin: 20,
    height: 50,
    width: 50,
  },
})

export default InfoCard;