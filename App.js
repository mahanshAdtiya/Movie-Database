import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import DetailsScreen from './Details';
import { Favs } from './Fav';
const Stack = createNativeStackNavigator();

const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
const Tab = createBottomTabNavigator();

function MainStack() {
  return (

    <Stack.Navigator initialRouteName="">
      <Stack.Screen
        name="Home"
        options={{ title: 'Movie Database' }}
        component={Home}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>

  );
}

function FavStack() {
  return (
    
    <Stack.Navigator initialRouteName="">
      <Stack.Screen name="Favs" component={Favs} options={{ title: 'Favourites' }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>

  );
}


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#2196F3',
          }}>
          <Tab.Screen
            name="Home"
            component={MainStack}
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Favs"
            component={FavStack}
            options={{
              unmountOnBlur: true,
              headerShown: false,              
              tabBarLabel: 'Favourites',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="heart"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
