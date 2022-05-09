import React, {useState,useContext} from 'react';
import {View, Text, TouchableOpacity,SafeAreaView, Alert,ScrollView,Platform,StyleSheet} from 'react-native';
import FormButton_2 from '../../components/shared/FormButton_2';
import FormInput_2 from '../../components/shared/FormInput_2';
import { COLORS } from '../../components/constants/theme';
import {AuthContext} from '../../utils/AuthProvider';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const {register} = useContext(AuthContext);


  
  


  return (
    <ScrollView style={{backgroundColor: 'white'}}>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
      }}>
      {/* 제목 */}
      <Text
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontWeight: 'bold',
          marginVertical: 32,
        }}>
        회원가입
      </Text>

      {/* 이메일 */}
      <FormInput_2
        labelValue={email}
        labelText="Email"
        iconType="user"
        placeholderText="이메일"
        onChangeText={(userEmail) => setEmail(userEmail)}
        keyboardType={'email-address'}
      />

      {/* 비밀번호 */}
      <FormInput_2
        labelValue={password}
        labelText="Password"
        placeholderText="비밀번호"
        iconType="lock"
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
      />

      {/* 비밀번호 확인 */}
      <FormInput_2
        labelValue={confirmPassword}
        labelText="Confirm Password"
        placeholderText="비밀번호 확인"
        iconType="lock"
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        secureTextEntry={true}
      />
      {/* 이름 */}
      <FormInput_2
        labelValue={name}
        labelText="Name"
        placeholderText="이름"
        iconType="check"
        onChangeText={(userName) => setName(userName)}
      />
      {/* 나이 */}
      <FormInput_2
        labelValue={age}
        labelText="Age"
        placeholderText="나이"
        iconType="check"
        onChangeText={(userAge) => setAge(userAge)}
      />
      {/* 핸드폰 */}
      <FormInput_2
        labelValue={phone}
        labelText="Phone"
        placeholderText="핸드폰"
        iconType="phone"
        onChangeText={(userPhone) => setPhone(userPhone)}
      />
      

      {/* 가입 버튼 */}
      <FormButton_2
        buttonTitle="회원가입"
        onPress={() => register(email, password,phone,name,age)}
        
      />

      {/* 하단 */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <Text>이미 계정이 존재하십니까?</Text>
        <Text
          style={{marginLeft: 4, color: COLORS.primary}}
          onPress={() => navigation.navigate('Signin')}>
          로그인
        </Text>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;
