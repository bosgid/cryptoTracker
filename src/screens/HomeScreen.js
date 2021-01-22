
import React, { useState, useContext, useEffect } from 'react';
import { FlatList, ScrollView, View, LogBox, RefreshControl } from 'react-native';
import InfoCard from '../components/info/InfoCard';
import LinkText from '../components/LinkText';
import { CurrencyContext } from '../context/CurrencyContext';

// Ignore warning 
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { currencyState, actions: { fetchCryptos, resetCurrencyState } } = useContext(CurrencyContext);
  
  useEffect(() => {
    resetCurrencyState();
    const unsubscribe = fetchCryptos();

    return () => {
      unsubscribe();
    }
  }, [refreshing])

  useEffect(() => {
    navigation.addListener('focus', () => {
      refresh();
    })

    return () => {
      navigation.removeListener('focus');
    };
  }, [])

  const refresh = () => {
    setRefreshing(!refreshing);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refresh} />
      }
    >
      <View style={{ height: currencyState.list.length*100 }}>
        <FlatList
          data={currencyState.list}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <InfoCard currency={item}/>
            )
          }}
        />
      </View>

      <LinkText 
        text='+ Add a Cryptocurrency' 
        onPress={() => navigation.navigate('Add')} 
        textSize={16}
        isLoading={!currencyState.isFetched}
      />
    </ScrollView>
  );
}

export { HomeScreen };