import React, {useState,useContext} from 'react';
import {View, Text, SafeAreaView,StyleSheet,StatusBar} from 'react-native';
import FormInput_2 from '../../components/shared/FormInput_2';
import { COLORS } from '../../components/constants/theme';
import SocialButton from '../../components/shared/SocialButton';
import { Klogin } from '../../utils/auth';
import FormButton_2 from '../../components/shared/FormButton_2';
import {AuthContext} from '../../utils/AuthProvider';

const SigninScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, googleLogin} = useContext(AuthContext);




  return (
    <View style={styles.container}>
      
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
      }}>
      {/* 상단 */}
      <Text
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontWeight: 'bold',
          marginVertical: 64,
        }}>
        로그인
      </Text>
     
      {/* 이메일 */}
      <FormInput_2
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput_2
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
        
      />
      
   
      {/* 가입 button */}
      <FormButton_2
        buttonTitle="로그인"
        onPress={() => login(email, password)}
      />

      {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="카카오톡 로그인"
            btnType="facebook"
            color="#3C1E1E"
            backgroundColor="#F7E314"
            onPress={() =>  Klogin()}
          />

          <SocialButton
            buttonTitle="구글 로그인"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}
      {/* 하단 */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <Text>계정이 존재하지 않습니까?</Text>
        <Text
          style={{marginLeft: 4, color: COLORS.primary}}
          onPress={() => navigation.navigate('SignUp')}>
          회원가입
        </Text>
      </View>
    </SafeAreaView>
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FF6347'
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
});