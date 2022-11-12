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
import CustomerMessages from './src/customer/CustomerMessages.js';
import CoachDashboard from './src/coach/CoachDashboard.js';
import CoachSchoolsPhotos from './src/coach/CoachSchoolsPhotos.js';
import CoachParticularSchoolPhotos from './src/coach/CoachParticularSchoolPhotos.js';
import CoachParticularSchoolParticularPhoto from './src/coach/CoachParticularSchoolParticularPhoto.js';
import CoachCalendar from './src/coach/CoachCalendar.js';
import CoachMesages from './src/coach/CoachMesages.js';
import CoachSchoolList from './src/coach/CoachSchoolList.js';
import CoachParticularSchoolStudents from './src/coach/CoachParticularSchoolStudents.js';
import SuperAdminDashboard from './src/superadmin/SuperAdminDashboard.js';
import SuperAdminBilling from './src/superadmin/SuperAdminBilling.js';
import SuperAdminCoaches from './src/superadmin/SuperAdminCoaches.js';
import SuperAdminPhotos from './src/superadmin/SuperAdminPhotos.js';
import SuperAdminStudents from './src/superadmin/SuperAdminStudents.js';
import SuperAdminSettings from './src/superadmin/SuperAdminSettings.js';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SuperAdminDashboard">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
        <Stack.Screen name="CustomerPhotos" component={CustomerPhotos} />
        <Stack.Screen name="CustomerParticularPhoto" component={CustomerParticularPhoto} />
        <Stack.Screen name="CustomerMessages" component={CustomerMessages} />
        <Stack.Screen name="CoachDashboard" component={CoachDashboard} />
        <Stack.Screen name="CoachSchoolsPhotos" component={CoachSchoolsPhotos} />
        <Stack.Screen name="CoachParticularSchoolPhotos" component={CoachParticularSchoolPhotos} />
        <Stack.Screen name="CoachParticularSchoolParticularPhoto" component={CoachParticularSchoolParticularPhoto} />
        <Stack.Screen name="CoachCalendar" component={CoachCalendar} />
        <Stack.Screen name="CoachMessages" component={CoachMesages} />
        <Stack.Screen name="CoachSchoolList" component={CoachSchoolList} />
        <Stack.Screen name="CoachParticularSchoolStudents" component={CoachParticularSchoolStudents} />
        <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
        <Stack.Screen name="SuperAdminBilling" component={SuperAdminBilling} />
        <Stack.Screen name="SuperAdminCoaches" component={SuperAdminCoaches} />
        <Stack.Screen name="SuperAdminPhotos" component={SuperAdminPhotos} />
        <Stack.Screen name="SuperAdminStudents" component={SuperAdminStudents} />
        <Stack.Screen name="SuperAdminSettings" component={SuperAdminSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
