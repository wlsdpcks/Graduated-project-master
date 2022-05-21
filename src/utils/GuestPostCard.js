import React from 'react';
import {Card,UserImg,UserName,UserContainerGuest,UserInfoTextGuest,PostTime,PostTextGuest, UserInfoGuest} from '../../styles/FeedStyles'

const GuestPostCard = ({item}) =>{

    return(
        <Card>
        <UserInfoGuest>
          <UserImg source = {item.userImg}/>
          <UserContainerGuest>
          <UserInfoTextGuest>
          <UserName>{item.userName}</UserName>
          <PostTime> {item.postTime}</PostTime>
          </UserInfoTextGuest>
          <PostTextGuest>{item.post}</PostTextGuest>
          </UserContainerGuest>
        </UserInfoGuest>
        </Card>
    );
};
export default GuestPostCard;