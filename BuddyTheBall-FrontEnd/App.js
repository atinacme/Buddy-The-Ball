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
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from "react-native";
import SignIn from './src/auth/SignIn.js';
import CustomerCreation from './src/customer/CustomerCreation.js';
import CustomerDashboard from './src/customer/CustomerDashboard.js';
import CustomerPhotos from './src/customer/CustomerPhotos.js';
import CustomerParticularPhoto from './src/customer/CustomerParticularPhoto.js';
import CustomerMessages from './src/customer/CustomerMessages';
import CustomerMessageCreation from './src/customer/CustomerMessageCreation';
import CustomerParticularMessage from './src/customer/CustomerParticularMessage';
import CoachCreation from './src/coach/CoachCreation.js';
import CoachDashboard from './src/coach/CoachDashboard.js';
import CoachCustomers from './src/coach/CoachCustomers';
import CoachCustomerDescription from './src/coach/CoachCustomerDescription';
import CoachSchoolsPhotos from './src/coach/CoachSchoolsPhotos.js';
import CoachPhotoCreation from './src/coach/CoachPhotoCreation.js';
import CoachParticularSchoolPhotos from './src/coach/CoachParticularSchoolPhotos.js';
import CoachCalendar from './src/coach/CoachCalendar.js';
import CoachMessages from './src/coach/CoachMessages.js';
import CoachMessageCreation from './src/coach/CoachMessageCreation';
import CoachParticularMessage from './src/coach/CoachParticularMessage';
import CoachSchoolList from './src/coach/CoachSchoolList.js';
import CoachParticularSchoolStudents from './src/coach/CoachParticularSchoolStudents.js';
import SuperAdminDashboard from './src/superadmin/SuperAdminDashboard.js';
import SuperAdminBilling from './src/superadmin/SuperAdminBilling.js';
import SuperAdminBillingCoachSchool from './src/superadmin/SuperAdminBillingCoachSchool';
import SuperAdminCoaches from './src/superadmin/SuperAdminCoaches.js';
import SuperAdminCoachDescription from './src/superadmin/SuperAdminCoachDescription';
import SuperAdminSchools from './src/superadmin/SuperAdminSchools.js';
import SuperAdminSchoolDescription from './src/superadmin/SuperAdminSchoolDescription.js';
import SuperAdminSchoolCreation from './src/superadmin/SuperAdminSchoolCreation.js';
import SuperAdminPhotos from './src/superadmin/SuperAdminPhotos.js';
import SuperAdminStudents from './src/superadmin/SuperAdminStudents.js';
import SuperAdminSettings from './src/superadmin/SuperAdminSettings.js';
import SuperAdminMessages from './src/superadmin/SuperAdminMessages';
import SuperAdminMessageCreation from './src/superadmin/SuperAdminMessageCreation';
import SuperAdminParticularMessage from './src/superadmin/SuperAdminParticularMessage';
import SuperAdminRegionalManagers from './src/superadmin/SuperAdminRegionalManagers';
import SuperAdminRegionalManagerDescription from './src/superadmin/SuperAdminRegionalManagerDescription';
import SuperAdminRegionalManagerCreation from './src/superadmin/SuperAdminRegionalManagerCreation';
import SuperAdminRegions from './src/superadmin/SuperAdminRegions';
import SuperAdminRegionCreation from './src/superadmin/SuperAdminRegionCreation';
import SuperAdminRegionDescription from './src/superadmin/SuperAdminRegionDescription';
import RegionalManagerDashboard from './src/regionalmanager/RegionalManagerDashboard';
import RegionalManagerCoaches from './src/regionalmanager/RegionalManagerCoaches';
import RegionalManagerCoachCreation from './src/regionalmanager/RegionalManagerCoachCreation';
import RegionalManagerCoachDescription from './src/regionalmanager/RegionalManagerCoachDescription.js';
import RegionalManagerPhotos from './src/regionalmanager/RegionalManagerPhotos';
import RegionalManagerParticularSchoolPhotos from './src/regionalmanager/RegionalManagerParticularSchoolPhotos';
import RegionalManagerCalendar from './src/regionalmanager/RegionalManagerCalendar';
import RegionalManagerCoachAgenda from './src/regionalmanager/RegionalManagerCoachAgenda';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{
            headerShown: true,
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 16,
              textTransform: 'uppercase',
            },
          }}>
            <Stack.Screen name="SignIn" component={SignIn} style={{ marginTop: 40 }} />
            <Stack.Screen name="Customer Creation" component={CustomerCreation} />
            <Stack.Screen name="Customer Dashboard" options={{ headerBackVisible: false, headerTitleAlign: 'center' }} component={CustomerDashboard} />
            <Stack.Screen name="Customer Photos" component={CustomerPhotos} />
            <Stack.Screen name="Customer Particular Photo" component={CustomerParticularPhoto} />
            <Stack.Screen name="Customer Messages" component={CustomerMessages} />
            <Stack.Screen name="Customer Message Creation" component={CustomerMessageCreation} />
            <Stack.Screen name="Customer Particular Message" component={CustomerParticularMessage} />
            <Stack.Screen name="Coach Creation" component={CoachCreation} />
            <Stack.Screen name="Coach Dashboard" options={{ headerBackVisible: false, headerTitleAlign: 'center' }} component={CoachDashboard} />
            <Stack.Screen name="Coach Customers" component={CoachCustomers} />
            <Stack.Screen name="Coach Customer Description" component={CoachCustomerDescription} />
            <Stack.Screen name="Coach Schools Photos" component={CoachSchoolsPhotos} />
            <Stack.Screen name="Coach Photo Creation" component={CoachPhotoCreation} />
            <Stack.Screen name="Coach Particular School Photos" component={CoachParticularSchoolPhotos} />
            <Stack.Screen name="Coach Calendar" component={CoachCalendar} />
            <Stack.Screen name="Coach Messages" component={CoachMessages} />
            <Stack.Screen name="Coach Message Creation" component={CoachMessageCreation} />
            <Stack.Screen name="Coach Particular Message" component={CoachParticularMessage} />
            <Stack.Screen name="Coach School List" component={CoachSchoolList} />
            <Stack.Screen name="Coach Particular School Students" component={CoachParticularSchoolStudents} />
            <Stack.Screen name="SuperAdmin Dashboard" options={{ headerTitleAlign: 'center' }} component={SuperAdminDashboard} />
            <Stack.Screen name="SuperAdmin Billing" component={SuperAdminBilling} />
            <Stack.Screen name="SuperAdmin Billing Coach School" component={SuperAdminBillingCoachSchool} />
            <Stack.Screen name="SuperAdmin Coaches" component={SuperAdminCoaches} />
            <Stack.Screen name="SuperAdmin Coach Description" component={SuperAdminCoachDescription} />
            <Stack.Screen name="SuperAdmin Schools" component={SuperAdminSchools} />
            <Stack.Screen name="SuperAdmin School Description" component={SuperAdminSchoolDescription} />
            <Stack.Screen name="SuperAdmin School Creation" component={SuperAdminSchoolCreation} />
            <Stack.Screen name="SuperAdmin Photos" component={SuperAdminPhotos} />
            <Stack.Screen name="SuperAdmin Students" component={SuperAdminStudents} />
            <Stack.Screen name="SuperAdmin Settings" options={{ headerBackVisible: false, headerTitleAlign: 'center' }} component={SuperAdminSettings} />
            <Stack.Screen name="SuperAdmin Messages" component={SuperAdminMessages} />
            <Stack.Screen name="SuperAdmin Message Creation" component={SuperAdminMessageCreation} />
            <Stack.Screen name="SuperAdmin Particular Message" component={SuperAdminParticularMessage} />
            <Stack.Screen name="SuperAdmin Regional Manager" component={SuperAdminRegionalManagers} />
            <Stack.Screen name="SuperAdmin Regional Manager Description" component={SuperAdminRegionalManagerDescription} />
            <Stack.Screen name="SuperAdmin Regional Manager Creation" component={SuperAdminRegionalManagerCreation} />
            <Stack.Screen name="SuperAdmin Regions" component={SuperAdminRegions} />
            <Stack.Screen name="SuperAdmin Region Creation" component={SuperAdminRegionCreation} />
            <Stack.Screen name="SuperAdmin Region Description" component={SuperAdminRegionDescription} />
            <Stack.Screen name="Regional Manager Dashboard" component={RegionalManagerDashboard} />
            <Stack.Screen name="Regional Manager Coaches" component={RegionalManagerCoaches} />
            <Stack.Screen name="Regional Manager Coach Creation" component={RegionalManagerCoachCreation} />
            <Stack.Screen name="Regional Manager Coach Description" component={RegionalManagerCoachDescription} />
            <Stack.Screen name="Regional Manager Photos" component={RegionalManagerPhotos} />
            <Stack.Screen name="Regional Manager Particular School Photos" component={RegionalManagerParticularSchoolPhotos} />
            <Stack.Screen name="Regional Manager Calendar" component={RegionalManagerCalendar} />
            <Stack.Screen name="Regional Manager Coach Agenda" component={RegionalManagerCoachAgenda} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
export default App;
