import React,{useState,useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from './DetailScreen';
import StoreHome from './StoreHome';
import Loading from '../../utils/Loading';
const Stack = createStackNavigator();
const Store = () => { 
  const [ready, setReady] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setReady(false)
      },1000)
    },[])
  return (
    ready ? <Loading/> :  (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      
      <Stack.Screen name="StoreHome" component={StoreHome} />
      <Stack.Screen name="Details" component={DetailsScreen}/>
    </Stack.Navigator>
    )
  );
};

export default Store;

