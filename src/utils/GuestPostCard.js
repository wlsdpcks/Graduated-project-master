import React, {useContext} from 'react';
import { Dimensions,StyleSheet,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card,UserImg,UserName,UserContainerGuest,UserInfoTextGuest,PostTime,PostTextGuest, UserInfoGuest} from '../../styles/FeedStyles'

import { AuthContext } from '../utils/AuthProvider'

const GuestPostCard = ({item}) =>{
  const {user, logout} =useContext(AuthContext);

    return(
        <Card>
        <UserInfoGuest>
          <UserImg source = {{uri:item.userImg}} style={Styles.postImg}/>
          <UserContainerGuest>
          <UserInfoTextGuest>
          <UserName>{item.userName}</UserName>
          <PostTime> {item.postTime}</PostTime>
          {user.uid = item.userId ?
          <Ionicons name= "md-trash-bin" size={20}/>
          :null}
          </UserInfoTextGuest>
          <PostTextGuest>{item.post}</PostTextGuest>
          </UserContainerGuest>
        </UserInfoGuest>
        </Card>
    );
};
export default GuestPostCard;

const Styles = StyleSheet.create({
});