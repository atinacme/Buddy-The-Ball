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
import { Provider } from "react-redux";
import store from "./store";
import SignIn from './src/auth/SignIn.js';
import CustomerCreation from './src/customer/CustomerCreation.js';
import CustomerDashboard from './src/customer/CustomerDashboard.js';
import CustomerPhotos from './src/customer/CustomerPhotos.js';
import CustomerParticularPhoto from './src/customer/CustomerParticularPhoto.js';
import CustomerMessages from './src/customer/CustomerMessages.js';
import CoachCreation from './src/coach/CoachCreation.js';
import CoachDashboard from './src/coach/CoachDashboard.js';
import CoachSchoolsPhotos from './src/coach/CoachSchoolsPhotos.js';
import CoachPhotoCreation from './src/coach/CoachPhotoCreation.js';
import CoachParticularSchoolPhotos from './src/coach/CoachParticularSchoolPhotos.js';
import CoachParticularSchoolParticularPhoto from './src/coach/CoachParticularSchoolParticularPhoto.js';
import CoachCalendar from './src/coach/CoachCalendar.js';
import CoachMesages from './src/coach/CoachMesages.js';
import CoachSchoolList from './src/coach/CoachSchoolList.js';
import CoachParticularSchoolStudents from './src/coach/CoachParticularSchoolStudents.js';
import SuperAdminDashboard from './src/superadmin/SuperAdminDashboard.js';
import SuperAdminBilling from './src/superadmin/SuperAdminBilling.js';
import SuperAdminCoaches from './src/superadmin/SuperAdminCoaches.js';
import SuperAdminCoachDescription from './src/superadmin/SuperAdminCoachDescription.js';
import SuperAdminSchools from './src/superadmin/SuperAdminSchools.js';
import SuperAdminSchoolDescription from './src/superadmin/SuperAdminSchoolDescription.js';
import SuperAdminSchoolCreation from './src/superadmin/SuperAdminSchoolCreation.js';
import SuperAdminPhotos from './src/superadmin/SuperAdminPhotos.js';
import SuperAdminStudents from './src/superadmin/SuperAdminStudents.js';
import SuperAdminSettings from './src/superadmin/SuperAdminSettings.js';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Customer Creation" component={CustomerCreation} />
          <Stack.Screen name="Customer Dashboard" component={CustomerDashboard} />
          <Stack.Screen name="Customer Photos" component={CustomerPhotos} />
          <Stack.Screen name="Customer Particular Photo" component={CustomerParticularPhoto} />
          <Stack.Screen name="Customer Messages" component={CustomerMessages} />
          <Stack.Screen name="Coach Creation" component={CoachCreation} />
          <Stack.Screen name="Coach Dashboard" component={CoachDashboard} />
          <Stack.Screen name="Coach Schools Photos" component={CoachSchoolsPhotos} />
          <Stack.Screen name="Coach Photo Creation" component={CoachPhotoCreation} />
          <Stack.Screen name="Coach Particular School Photos" component={CoachParticularSchoolPhotos} />
          <Stack.Screen name="Coach Particular School Particular Photo" component={CoachParticularSchoolParticularPhoto} />
          <Stack.Screen name="Coach Calendar" component={CoachCalendar} />
          <Stack.Screen name="Coach Messages" component={CoachMesages} />
          <Stack.Screen name="Coach School List" component={CoachSchoolList} />
          <Stack.Screen name="Coach Particular School Students" component={CoachParticularSchoolStudents} />
          <Stack.Screen name="SuperAdmin Dashboard" component={SuperAdminDashboard} />
          <Stack.Screen name="SuperAdmin Billing" component={SuperAdminBilling} />
          <Stack.Screen name="SuperAdmin Coaches" component={SuperAdminCoaches} />
          <Stack.Screen name="SuperAdmin Coach Description" component={SuperAdminCoachDescription} />
          <Stack.Screen name="SuperAdmin Schools" component={SuperAdminSchools} />
          <Stack.Screen name="SuperAdmin School Description" component={SuperAdminSchoolDescription} />
          <Stack.Screen name="SuperAdmin School Creation" component={SuperAdminSchoolCreation} />
          <Stack.Screen name="SuperAdmin Photos" component={SuperAdminPhotos} />
          <Stack.Screen name="SuperAdmin Students" component={SuperAdminStudents} />
          <Stack.Screen name="SuperAdmin Settings" component={SuperAdminSettings} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


export default App;
