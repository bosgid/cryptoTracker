import React, { useReducer } from 'react';
import { LogBox } from 'react-native';
import firebase from 'firebase';
import 'intl';
import 'intl/locale-data/jsonp/en';

LogBox.ignoreLogs([ 'Setting a timer' ]);

const CurrencyContext = React.createContext();

const Reducer = (currencyState, action) => {
  switch (action.type) {

    case 'add_currency':
      return { ...currencyState, list: [...currencyState.list, action.payload]};

    case 'delete_currency':
      return { 
        ...currencyState, 
        list: currencyState.list.filter((currency) => currency.name !== action.payload.name )
      };

    case 'reset_currency_state':
      return { list: [], isFetched: false };

    case 'set_fetched_state':
      return { ...currencyState, isFetched: action.payload };

    default:
      return currencyState;
  }
}

const CurrencyProvider = ({ children }) => {
  const [currencyState, dispatch] = useReducer(Reducer, { list: [], isFetched: false })

  const fetchCryptos = () => {
    const { currentUser } = firebase.auth();
    const cryptosRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('cryptos');

    return (
      cryptosRef.onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach(change => {
          if(change.type == 'added') {
            dispatch({ type: 'add_currency', payload: change.doc.data() });
          } else if (change.type == 'removed') {
            dispatch({ type: 'delete_currency', payload: change.doc.data() })
          }
        })

        dispatch({ type: 'set_fetched_state', payload: true })
      }, function(err) {
        console.log(err)
      })
    )
  }

  const addCurrency = (currency) => {
    const { currentUser } = firebase.auth();
    const timestamp = new Date().getTime();
    const cryptosRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('cryptos');
    const usd_formatted = new Intl.NumberFormat(
    'en-US', 
    { style: 'currency', currency: 'USD' })
    .format(currency.metrics.market_data.price_usd.toFixed(2));

    cryptosRef.doc(`${timestamp}`).set({
      timestamp: timestamp,
      id: currency.id,
      name: currency.name,
      symbol: currency.symbol,
      usd_value: usd_formatted,
      change_24hr: currency.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2),
      icon_link:`https://cryptologos.cc/logos/${currency.name.toLowerCase()}-${currency.symbol.toLowerCase()}-logo.png?v=009`
    });
  }

  const deleteCurrency = (deleteList) => {
    const { currentUser } = firebase.auth();
    const cryptosRef = firebase.firestore().collection('users').doc(currentUser.uid).collection('cryptos');

    deleteList.forEach((currency) => {
     cryptosRef.doc(`${currency.timestamp}`).delete();
    })
  }

  const resetCurrencyState = () => {
    dispatch({ type: 'reset_currency_state' });
  }

  return (
    <CurrencyContext.Provider value={{ currencyState, 
    actions: { fetchCryptos, addCurrency, deleteCurrency, resetCurrencyState } }
    }>
      {children}
    </CurrencyContext.Provider>
  )
}

export { CurrencyContext, CurrencyProvider };