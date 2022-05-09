import auth from '@react-native-firebase/auth';
import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { KakaoSDK } from '@actbase/react-kakaosdk';
import firestore from '@react-native-firebase/firestore'
export const AuthContext = createContext();

export const signIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      ToastAndroid.show('로그인', ToastAndroid.SHORT);
    })
    .catch(err => {
      console.log(err);
    });
};



const Klogin = async () => {
  try {
    await KakaoSDK.init()
    const tokens = await KakaoSDK.login()
    return tokens
  } catch (e) {
    console.log(e)
  }
}
const getProfile = () => {

}
const logout = () => {

}
export {
  Klogin,
  getProfile,
  logout
}


export const googleLogin = async () => { 
  const { idToken } = await GoogleSignin.signIn(); 
  const googleCredential = auth.GoogleAuthProvider.credential(idToken); 
  return auth().signInWithCredential(googleCredential);
 }


 export const signUp = (email, password,phone,name,age,point=0) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      ToastAndroid.show('가입완료', ToastAndroid.SHORT);
      firestore().collection("users").doc(auth().currentUser.uid).set({
        email,password,phone,name,age,point
      })
    })
    .catch(err => {
      console.log(err);
    });
};

export const signOut = () => {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
  auth()
    .signOut()
    .then(() => {
      ToastAndroid.show('로그아웃', ToastAndroid.SHORT);
    });
};
