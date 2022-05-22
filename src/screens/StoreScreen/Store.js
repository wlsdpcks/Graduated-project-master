import React,{useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from './DetailScreen';
import StoreHome from './StoreHome';
const Stack = createStackNavigator();

const Store = () => { 
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      
      <Stack.Screen name="StoreHome" component={StoreHome} />
      <Stack.Screen name="Details" component={DetailsScreen}/>
    </Stack.Navigator>
  );
};

export default Store;

