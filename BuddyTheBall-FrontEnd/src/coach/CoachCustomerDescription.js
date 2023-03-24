import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Image, Alert, ScrollView, TouchableOpacity, View } from "react-native";
import buddy from '../assets/buddy.png';
import { CoachUpdateService } from '../services/CoachService';
import { GetAwardPhotosService, GetParticularCustomerService, UpdateCustomerService } from '../services/CustomerService';
import { Formik } from 'formik';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';

export default function CoachCustomerDescription({ navigation, route }) {
    const [customerData, setCustomerData] = useState({
        user_id: '',
        email: '',
        password: '',
        parent_name: '',
        player_name: '',
        player_age: '',
        wristband_level: '',
        handed: '',
        created_by: '',
        num_buddy_books_read: '',
        jersey_size: ''
    });
    const [awardList, setAwardList] = useState([]);
    const [awardSelected, setAwardSelected] = useState({
        name: '',
        image: ''
    });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const getParticularCustomer = async () => {
                const result = await GetParticularCustomerService(route.params.customerData._id);
                console.log("dwshgxfw---->", result);
                if (result) {
                    setCustomerData({
                        user_id: result.user_id,
                        email: result.email,
                        password: result.password,
                        parent_name: result.parent_name,
                        player_name: result.player_name,
                        player_age: result.player_age,
                        wristband_level: result.wristband_level !== null ? result.wristband_level : '',
                        school: result.school.school_name,
                        handed: result.handed,
                        created_by: result.created_by,
                        num_buddy_books_read: result.num_buddy_books_read,
                        jersey_size: result.jersey_size !== null ? result.jersey_size : '',
                    });
                    setAwardSelected({
                        name: result.current_award !== {} ? result.current_award.name : '',
                        image: result.current_award !== {} ? result.current_award.image : ''
                    });
                }
            };
            getParticularCustomer();

            const getAwardsList = async () => {
                const result = await GetAwardPhotosService();
                if (result) {
                    setAwardList(result);
                }
            };
            getAwardsList();
        } catch (e) { }
    }, []);

    const toggleDropdown = () => {
        setVisible(!visible);
    };

    const handleSelectAward = (v) => {
        setVisible(!visible);
        setAwardSelected({ name: v.name, image: v.url });
    };

    const loginValidationSchema = yup.object().shape({
        password: yup
            .string()
            .min(5, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        wristband_level: yup
            .string()
            .required('Wrist Band Level is required'),
        jersey_size: yup
            .string()
            .required('Jersey Size is required'),
        current_award: yup
            .string()
            .required('Current Award is required')
    });

    const handleCustomerUpdate = async () => {
        try {
            const data = {
                password: customerData.password,
                wristband_level: customerData.wristband_level,
                tennis_club: customerData.tennis_club,
                jersey_size: customerData.jersey_size,
                current_award: awardSelected
            };
            console.log("cd-->", data);
            const result = await UpdateCustomerService(customerData.user_id, route.params.customerData._id, data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "Customer Updated Successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("Coach Customers")
                        }
                    ]
                );
            }
        } catch (e) {
            Alert.alert(
                "Alert",
                "Failed! Can't Update Customer!"
            );
        }
    };

    console.log("values--->", customerData);

    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.wrapper}>
                <ScrollView style={styles.scrollView}>
                    <Image source={buddy} style={{ width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
                    {/* <Formik
                        enableReinitialize={true}
                        validationSchema={loginValidationSchema}
                        initialValues={{
                            user_id: customerData.user_id,
                            email: customerData.email,
                            password: customerData.password,
                            parent_name: customerData.parent_name,
                            player_name: customerData.player_name,
                            player_age: customerData.player_age,
                            school: customerData.school,
                            wristband_level: '',
                            handed: customerData.handed,
                            created_by: customerData.created_by,
                            num_buddy_books_read: customerData.num_buddy_books_read,
                            jersey_size: '',
                            current_award: ''
                        }}
                        onSubmit={(values) => handleCustomerUpdate(values)}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleSelectAward,
                            values,
                            errors,
                            isValid,
                        }) => (
                            <> */}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        name="email"
                        placeholder="Email Address"
                        // onChangeText={handleChange('email')}
                        // onBlur={handleBlur('email')}
                        value={customerData.email}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        name="password"
                        placeholder="Password"
                        onChangeText={(value) => setCustomerData({ ...customerData, password: value })}
                        // onBlur={handleBlur('password')}
                        value={customerData.password}
                        style={styles.input}
                    />
                    {customerData.password === '' &&
                        <Text style={{ fontSize: 10, color: 'red' }}>Password is required</Text>
                    }
                    <Text style={styles.label}>Parent Name</Text>
                    <TextInput
                        name="parent_name"
                        placeholder="Password"
                        // onChangeText={handleChange('parent_name')}
                        // onBlur={handleBlur('parent_name')}
                        value={customerData.parent_name}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Player Name</Text>
                    <TextInput
                        name="player_name"
                        placeholder="Player Name"
                        // onChangeText={handleChange('player_name')}
                        // onBlur={handleBlur('player_name')}
                        value={customerData.player_name}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Player Age</Text>
                    <TextInput
                        name="player_age"
                        placeholder="Player Age"
                        // onChangeText={handleChange('player_age')}
                        // onBlur={handleBlur('player_age')}
                        value={customerData.player_age}
                        style={styles.input}
                    />
                    <Text style={styles.label}>WristBand Level</Text>
                    <TextInput
                        name="wristband_level"
                        placeholder="WristBand Level"
                        onChangeText={(value) => setCustomerData({ ...customerData, wristband_level: value })}
                        // onBlur={handleBlur('wristband_level')}
                        value={customerData.wristband_level}
                        style={styles.input}
                    />
                    {customerData.wristband_level === '' &&
                        <Text style={{ fontSize: 10, color: 'red' }}>WristBand Level is required</Text>
                    }
                    <Text style={styles.label}>Schools</Text>
                    <TextInput
                        name="school"
                        placeholder="School"
                        // onChangeText={handleChange('school')}
                        // onBlur={handleBlur('school')}
                        value={customerData.school}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Handed</Text>
                    <TextInput
                        name="handed"
                        placeholder="Handed"
                        // onChangeText={handleChange('handed')}
                        // onBlur={handleBlur('handed')}
                        value={customerData.handed}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Number of Buddy Books Read</Text>
                    <TextInput
                        name="num_buddy_books_read"
                        placeholder="Number of Buddy Books Read"
                        // onChangeText={handleChange('num_buddy_books_read')}
                        // onBlur={handleBlur('num_buddy_books_read')}
                        value={customerData.num_buddy_books_read}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Jersey Size</Text>
                    <TextInput
                        name="jersey_size"
                        placeholder="Jersey Size"
                        onChangeText={(value) => setCustomerData({ ...customerData, jersey_size: value })}
                        // onBlur={handleBlur('jersey_size')}
                        value={customerData.jersey_size}
                        style={styles.input}
                    />
                    {customerData.jersey_size === '' &&
                        <Text style={{ fontSize: 10, color: 'red' }}>Jersey Size is required</Text>
                    }
                    <Text style={styles.label}>Current Award</Text>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <View style={styles.buttonText}>{awardSelected.image ? <Image source={{ uri: awardSelected.image }} style={styles.buttonImage} /> : <Text>Select the Award</Text>}</View>
                    </TouchableOpacity>
                    {visible &&
                        (<View style={styles.award}>
                            {visible && awardList.map(v => {
                                return (
                                    <ScrollView showsVerticalScrollIndicator>
                                        <TouchableOpacity key={v._id} onPress={() => handleSelectAward(v)}>
                                            <Image source={{ uri: v.url }} style={{ height: 100, width: 100 }} />
                                        </TouchableOpacity>
                                    </ScrollView>
                                );
                            })}
                        </View>
                        )}
                    {awardSelected.name === '' &&
                        <Text style={{ fontSize: 10, color: 'red' }}>Current Award is required</Text>
                    }
                    <TouchableOpacity onPress={handleCustomerUpdate}>
                        <Text style={styles.submit}>Update</Text>
                    </TouchableOpacity>
                    {/* </>
                        )}
                    </Formik> */}
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("Coach Customers")}>
                    <Text style={styles.backbtn}>Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 2,
        paddingLeft: 15,
        paddingRight: 15,
        position: 'relative',
        marginBottom: 56,
        marginTop: 60
    },
    submit: {
        borderColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ff8400",
        borderWidth: 3,
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "700",
        marginTop: 5,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    backbtn: {
        borderColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#ff8400",
        borderWidth: 3,
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "700",
        marginTop: 5,
        position: 'absolute',
        display: 'flex',
        right: 0,
        width: 100,
        justifyContent: 'flex-end'
    },
    linearGradient: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10
    },
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 0
    },
    buttonText: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    award: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    buttonImage: {
        height: 100,
        width: 100
    }
});