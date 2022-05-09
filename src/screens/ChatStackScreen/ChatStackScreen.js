import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import ChatList from '../ChatList/ChatList';
import ChatScreen from '../ChatScreen/ChatScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const ProfileStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen name='ChatList' component={ChatList}/>
                <Stack.Screen name='ChatScreen' component={ChatScreen}
                options={({route}) => ({
                  title: route.params.userName,
                  headerBackTitleStyle: true,
                })

                }
                />
            </Stack.Navigator>
  );
};

export default ProfileStackScreen;
