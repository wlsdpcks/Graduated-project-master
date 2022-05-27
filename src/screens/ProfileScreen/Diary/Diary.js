import React from "react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleSheet,View,Text} from "react-native";
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';
const Diary = () => {
  
  
  return (
    <View>
    <Calendar  monthFormat={'yyyy년 MM월'}
    onDayPress={(day) => {console.log('selected day', day)}}
    
    // Handler which gets executed on day long press. Default = undefined
    onDayLongPress={(day) => {console.log('selected day', day)}}
    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
     style={styles.calendar} />

     <Text>day</Text>
     </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

export default Diary;