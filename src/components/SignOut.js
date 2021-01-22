
import React, { useState, useContext } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AuthContext } from '../context/AuthContext';
import { CurrencyContext } from '../context/CurrencyContext';

const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { actions: { signOut } }= useContext(AuthContext);
  const { actions: { resetCurrencyState } }= useContext(CurrencyContext);

  const signUserOut = async () => {
    setIsLoading(true);
    await signOut();
    resetCurrencyState();
  }

  { return isLoading ? (
    <ActivityIndicator size='small' color='white' style={{ margin: 45}}/>
  ) : (
    <TouchableOpacity 
      onPress={() => signUserOut()}
      >
      <MaterialIcons name='logout' size={30} color='white' style={{ margin: 40 }}/>
    </TouchableOpacity>
  )
  }
}

export default SignOut;