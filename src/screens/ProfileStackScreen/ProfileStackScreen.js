import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import EditProfile from '../EditProfile/EditProfile';
import Music from '../Music/Music';
import Friend from '../Friend/Friend';
import Diary from '../Diary/Diary';
import Album from '../Album/Album';
import Weblog from '../Weblog/Weblog';
import Follow from '../Follow/Follow';
import Miniroom from '../Miniroom/Miniroom';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SNSProfileScreen from '../ProfileScreen/SNSprofileScreen';
import test from '../StoreScreen/test';
const Stack = createNativeStackNavigator();
const ProfileStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
                <Stack.Screen name='Profile' component={ProfileScreen}
                 options={{headerShown: false}}/>
             
                

                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Music"
                    component={Music}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Friend"
                    component={Friend}
                    options={{
                    title: '친구',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Diary"
                    component={Diary}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Album"
                    component={Album}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Weblog"
                    component={Weblog}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Follow"
                    component={Follow}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />
                  <Stack.Screen
                    name="Miniroom"
                    component={Miniroom}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />

                <Stack.Screen
                    name="SNSProfile"
                    component={SNSProfileScreen}
                    options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                    
          
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                    <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                      </View>
                    ),
                    }}
                  />

                
            </Stack.Navigator>
  );
};

export default ProfileStackScreen;
