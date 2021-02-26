import * as React from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LandingScreen from './src/screens/Landing';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import MainScreen from './src/screens/Main';
import PostJobScreen from './src/screens/PostJob';
import AcceptJobScreen from './src/screens/AcceptJob';

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}


const Stack = createStackNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        const {userName} = data;

        const storeData = async (value) => {
              try {
                await AsyncStorage.setItem('userToken', value)
              } catch (e) {
                // saving error
              }
            } 
            
          storeData(userName);  
        dispatch({ type: 'SIGN_IN', token: userName });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        const {userName} = data;

      const storeData = async (value) => {
            try {
              await AsyncStorage.setItem('userToken', value)
            } catch (e) {
              // saving error
            }
          } 
          
        storeData(userName);  
      
        dispatch({ type: 'SIGN_IN', token: userName });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
           <>
            <Stack.Screen name="Landing" component = {LandingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Login" component = {LoginScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component = {RegisterScreen} options={{ headerShown: false}} />
           </>
          ) : (
            // User is signed in
            <>
            <Stack.Screen name="Main" component = {MainScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Post" component = {PostJobScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Accept" component = {AcceptJobScreen} options={{ headerShown: false}} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
