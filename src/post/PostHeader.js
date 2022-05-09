import React, {useContext, useEffect, useState} from 'react';

import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import palette from 'res/palette';
import images from 'res/images';
import colors from 'res/colors';
import PostImage from './PostImage';
import { AuthContext } from '../utils/AuthProvider';
import firestore from '@react-native-firebase/firestore';
export default function PostHeader({}) {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={Styles.container}>
      <View style={Styles.nameContainer}>
        <Image
          source={{uri: userData
            ? userData.userImg ||
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
            : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
        }}
          style={Styles.personImage}
        />
        <View>
          <Text style={Styles.personName}> {userData ? userData.name || 'Test' : 'Test'}{' '} </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Image source={images.more} style={Styles.iconMore} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 6,
    marginStart: 10,
    marginEnd: 10,
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  personImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  personName: {
    color: colors.text,
    marginStart: 10,
    fontWeight: 'bold',
  },
  placeName: {
    color: colors.text,
    marginStart: 10,
    fontSize: 12,
  },
  iconMore: {
    height: 15,
    width: 15,
  },
});
