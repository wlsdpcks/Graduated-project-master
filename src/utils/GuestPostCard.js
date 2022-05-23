import React from 'react';
import { Dimensions,StyleSheet,} from 'react-native';

import {Card,UserImg,UserName,UserContainerGuest,UserInfoTextGuest,PostTime,PostTextGuest, UserInfoGuest} from '../../styles/FeedStyles'

const GuestPostCard = ({item}) =>{

    return(
        <Card>
        <UserInfoGuest>
          <UserImg source = {{uri:item.userImg}} style={Styles.postImg}/>
          <UserContainerGuest>
          <UserInfoTextGuest>
          <UserName>{item.userName}</UserName>
          <PostTime> {item.postTime.toString()}</PostTime>
          </UserInfoTextGuest>
          <PostTextGuest>{item.post}</PostTextGuest>
          </UserContainerGuest>
        </UserInfoGuest>
        </Card>
    );
};
export default GuestPostCard;

const Styles = StyleSheet.create({
postImg: {
  height: Dimensions.get('screen').height / 3,
  width: Dimensions.get('screen').width,
  
},
});