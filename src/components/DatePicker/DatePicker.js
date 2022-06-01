import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import { DiaryBtn, DiaryBtnText } from '../../../styles/AddPost';
import firestore from '@react-native-firebase/firestore';
import firebase  from '@react-native-firebase/app';
import { AuthContext } from './AuthProvider';

const DatePicker = () => {
  const getdate=()=>{
    
  }

  const [date2,setdate2]=useState(null);

  firestore()
  .collection('Diary')
  .doc(firebase.auth().currentUser.uid)
  .collection('DiaryDetails')
  .doc(date2)   
  .set({

  })


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date().getTime());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(date);
    hideDatePicker();
    setdate2(format(date, 'yyyy-MM-dd'));
  };

  return (
    <View>
      <Text style={{fontSize: 20}}>
        {format(date, 'yyyy/MM/dd')}
      </Text>
      <DiaryBtn onPress={showDatePicker}>
      <DiaryBtnText>날짜</DiaryBtnText>
      </DiaryBtn>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;