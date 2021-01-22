import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import firebase from 'firebase';
import { LoadingScreen, SignInScreen, SignUpScreen, HomeScreen, AddScreen } from './src/screens';
import { CurrencyProvider, CurrencyContext } from "./src/context/CurrencyContext";
import { DeleteProvider, DeleteContext } from './src/context/DeleteContext';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import Trash from "./src/components/Trash";
import SignOut from "./src/components/SignOut";

const Stack = createStackNavigator();

const App = () => {
  const { deleteList } = useContext(DeleteContext);
  const { authState, actions: { setAuthState } } = useContext(AuthContext);
  const { actions: { fetchCryptos } } = useContext(CurrencyContext);

  // Fetch firebase data on initial render
  useEffect(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyCwHOBHEnw7AlxsoN1bbDnJ-PcPu4TyzT0",
      authDomain: "cryptocurrency-tracker-c9666.firebaseapp.com",
      projectId: "cryptocurrency-tracker-c9666",
      storageBucket: "cryptocurrency-tracker-c9666.appspot.com",
      messagingSenderId: "800062146682",
      appId: "1:800062146682:web:4e143f30d5b71792da53c3",
      measurementId: "G-QJ8088T2VR"
    })

    // Check if user is already signed in on app-startup
    firebase.auth().onAuthStateChanged((user) => {
      return user ? setAuthState(true) : setAuthState(false)
    })
  }, [])

  // Show loading screen while awaiting firebase data
  if (authState.isSignedIn === null) {
    return <LoadingScreen />;
  }
 
  const HomeScreenRightIcon = () => {
    // Show 'delete button' if there are items selected for delete
    return (deleteList.length !== 0) 
      ? <Trash deleteList={deleteList}/>
      : <SignOut />
  }

  return (
      <NavigationContainer>
        <Stack.Navigator>
          {authState.isSignedIn === false ? (
            <>
              <Stack.Screen 
                name='Sign in'
                component={SignInScreen} 
                options={{ 
                  headerTransparent: true, 
                  headerTitle: '',
                }}
              />
              <Stack.Screen 
                name='Sign up'
                component={SignUpScreen} 
                options={{ 
                  headerTransparent: true, 
                  headerTitle: '', 
                  headerLeft: null  
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen 
                name='Home'
                component={HomeScreen} 
                options={{ 
                  headerTitle: 'CryptoTracker',
                  headerTintColor: 'white',
                  headerRight: () => HomeScreenRightIcon(),
                  headerStyle: {
                    height: 120,
                    backgroundColor: '#385674',
                  } 
                }}
              />
              <Stack.Screen 
                name='Add'
                component={AddScreen} 
                options={{ 
                  headerTransparent: true, 
                  headerTitle: '',
                  headerBackTitleVisible: true,  
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default () => {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <DeleteProvider>
          <App />
        </DeleteProvider>
      </AuthProvider>
    </CurrencyProvider>
  );
}