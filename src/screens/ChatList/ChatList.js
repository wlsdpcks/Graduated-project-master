import React from 'react'
import { View, Text,FlatList,StyleSheet } from 'react-native'
import {Container,Card,UserInfo,UserImgWrapper,UserImg,UserInfoText,UserName,PostTime,MessageText,TextSection} from '../../../styles/MessageStyles'
import {useNavigation} from '@react-navigation/native';
const imgsrc = {uri: "http://weekly.chosun.com/up_fd/wc_news/2588/bimg_org/2588_58.jpg"}
const Messages = [
  {
    id: '1',
    UserName: 'n1',
    userImg: require('../../../assets/images/profileBasicImage.png'),
    MessageTime:'4 mins ago',
    messageText:'TestTestTestTestTestTestTestTestTestTestTestTestTest',
  },
  {
    id: '2',
    UserName: 'n2',
    userImg: require('../../../assets/images/profileBasicImage.png'),
    MessageTime:'4 mins ago',
    messageText:'TestTestTestTestTestTestTestTestTestTestTestTestTest',
  },
  {
    id: '3',
    UserName: 'n3',
    userImg: require('../../../assets/images/profileBasicImage.png'),
    MessageTime:'4 mins ago',
    messageText:'TestTestTestTestTestTestTestTestTestTestTestTestTest',
  },
  {
    id: '4',
    UserName: 'n4',
    userImg: require('../../../assets/images/profileBasicImage.png'),
    MessageTime:'4 mins ago',
    messageText:'TestTestTestTestTestTestTestTestTestTestTestTestTest',
  },
]
const ChatList = () => {
  const navigation = useNavigation();
;
  return (
    <Container>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card onPress={()=> navigation.navigate('ChatScreen', {userName:item.userName})}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} styles={styles.userBtn}/>
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.UserName}</UserName>
                  <PostTime>{item.MessageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  )
}

export default ChatList
const styles = StyleSheet.create({
  t1: {
    borderColor: 'blue',
    flex: 1,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
});