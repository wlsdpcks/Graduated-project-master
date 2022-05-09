import { View, Text,TouchableOpacity,StyleSheet,SafeAreaView,} from 'react-native';
import React from 'react';
import {CalendarList} from 'react-native-calendars';

const Diary = () => {
  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};//임의
    return (
      <SafeAreaView style={styles.container}>
      <CalendarList style={styles.calendarList}
  // Enable horizontal scrolling, default = false
  horizontal={true}
  // Enable paging on horizontal, default = false
  pagingEnabled={true}
   // Max amount of months allowed to scroll to the past. Default = 50
   pastScrollRange={12}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={12}
  // Set custom calendarWidth.
  calendarWidth={400}
  markingType={'multi-dot'}
  markedDates={{
    '2022-03-25': {dots: [vacation, massage]},
    '2022-03-26': {dots: [massage],}
  }}
/>
        <View style={styles.memo}>
          
        </View>
      </SafeAreaView>
  );
};

export default Diary;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
      backgroundColor: '#fff',
      padding: 20,
      borderWidth: 1,

    },
    title:{
      flexDirection: 'row', // 혹은 'column'
      flex: 1,
    },
    calendarList:{


    },
  });