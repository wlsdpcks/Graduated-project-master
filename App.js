import { StatusBar,SafeAreaView,StyleSheet } from 'react-native';
import React from 'react';
import Providers from './src/utils';

import store from './store';
import {Provider} from "react-redux";
import { theme } from './src/Chat/ChatTheme';
const App = () => {



  return (
    <SafeAreaView style={styles.container}>
  <StatusBar style="light" backgroundColor='orange' />
  <Provider store ={store}><Providers /></Provider>
  </SafeAreaView>
  );





}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
