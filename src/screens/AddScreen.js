import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AddButton, ErrorMessage, SearchInput } from '../components/search';
import { CurrencyContext } from '../context/CurrencyContext';

const AddScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { currencyState, actions: { addCurrency } } = useContext(CurrencyContext);

  // Fetch required cryptocurrency data from API 
  const getResults = async () => {
    setIsLoading(true);
    try {
      let response = await fetch(
        `https://data.messari.io/api/v1/assets?fields=id,name,symbol,metrics/market_data/price_usd,metrics/market_data/percent_change_usd_last_24_hours`
        );
      let json = await response?.json();
      setResults(json.data);
      setIsLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  // Execute on initial component render
  useEffect(() => {
    getResults();
  }, [])

  // Helper function to filter through results and return desired currency, based on 'currencyTerm'
  const filterByCurrency = (currencyTerm) => {
    return results.filter((result) => {
      return (result.symbol === currencyTerm.trim() || result.name === currencyTerm.trim());
    })
  }

  // Helper function to check if desired currency already exists in current list of tracked currencies
    const checkForDuplicate = (testCurrency) => {
      return currencyState.list.filter((currency) => {
        return currency.name === testCurrency.name;
      })
    }

  // Handles all functionality required after executing a search
  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      // Get searched currency from API data
      const newCurrency = filterByCurrency(searchTerm);
      if (newCurrency.length === 0) {
        setErrorMessage('Please enter valid currency');
      } else {
        // Check if searched currency is already being tracked
        const duplicate = checkForDuplicate(newCurrency[0]);
        if (duplicate.length !== 0) {
          setErrorMessage('You are already tracking this currency');
        } else {
          addCurrency(newCurrency[0]);
          setErrorMessage('');
          navigation.navigate('Home');
        }
      }  
    } else {
      setErrorMessage('Please enter valid currency');
    }
  }

  const onChangeSearch = (text) => {
    setText(text);
    setErrorMessage('');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.text}>Add a Cryptocurrency</Text>

      <SearchInput 
        text={text} 
        onChangeText={onChangeSearch}
        placeholder='Use a name or ticker symbol...'
      />

      <AddButton 
        isLoading={isLoading} 
        text={text} 
        handleSearch={handleSearch}
      />

      <ErrorMessage message={errorMessage} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 25,
    fontSize: 24,
  },
})

export { AddScreen };