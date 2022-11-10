/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/auth/Login.js';
import CustomerDashboard from './src/customer/CustomerDashboard.js';
import CustomerPhotos from './src/customer/CustomerPhotos.js';
import CustomerParticularPhoto from './src/customer/CustomerParticularPhoto.js';
import CoachDashboard from './src/coach/CoachDashboard.js';
import CoachSchoolList from './src/coach/CoachSchoolList.js';
import CoachParticularSchoolPhotos from './src/coach/CoachParticularSchoolPhotos.js';
import CoachParticularSchoolParticularPhoto from './src/coach/CoachParticularSchoolParticularPhoto.js';
import CoachCalendar from './src/coach/CoachCalendar.js';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
        <Stack.Screen name="CustomerPhotos" component={CustomerPhotos} />
        <Stack.Screen name="CustomerParticularPhoto" component={CustomerParticularPhoto} />
        <Stack.Screen name="CoachDashboard" component={CoachDashboard} />
        <Stack.Screen name="CoachSchoolList" component={CoachSchoolList} />
        <Stack.Screen name="CoachParticularSchoolPhotos" component={CoachParticularSchoolPhotos} />
        <Stack.Screen name="CoachParticularSchoolParticularPhoto" component={CoachParticularSchoolParticularPhoto} />
        <Stack.Screen name="CoachCalendar" component={CoachCalendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
