import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import { DiaryBtn, DiaryBtnText } from '../../../styles/AddPost';

const DatePicker = () => {
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