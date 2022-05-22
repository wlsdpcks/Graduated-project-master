import React,{useState} from 'react';
import toolStore from '../../screens/StoreScreen/toolStore';
import minimeStore from '../../screens/StoreScreen/minimeStore';
import musicStore from '../../screens/StoreScreen/musicStore';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from './DetailScreen';
import test from './test';
const Stack = createStackNavigator();

const Store = () => { 
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      
      <Stack.Screen name="test" component={test} />
      <Stack.Screen name="가구" component={toolStore} />
      <Stack.Screen name="미니미" component={minimeStore} />
      <Stack.Screen name="배경" component={musicStore} />
      <Stack.Screen name="Details" component={DetailsScreen}/>
    </Stack.Navigator>
  );
};

export default Store;

