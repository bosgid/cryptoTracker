
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { CurrencyContext } from '../context/CurrencyContext';
import { DeleteContext } from '../context/DeleteContext';

const Trash = ({ deleteList }) => {
  const { actions: { deleteCurrency } }= useContext(CurrencyContext);
  const { actions: { clearDeleteList } }= useContext(DeleteContext);

  const deleteItems = () => {
    deleteCurrency(deleteList);
    clearDeleteList();
  }

  return ( 
    <TouchableOpacity onPress={() => deleteItems()}>
      <FontAwesome5 name='trash' size={24} color='white' style={{ margin: 50 }}/>
    </TouchableOpacity>
  );
}

export default Trash;