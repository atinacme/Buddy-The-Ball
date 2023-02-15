import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert, ScrollView } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import buddy from '../assets/buddy.png';
import { useSelector } from "react-redux";
import { SignUpService } from '../services/UserAuthService';
import { Formik } from 'formik';
import * as yup from 'yup';

export default function CustomerCreation({ navigation }) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const state = useSelector((state) => state);

    useEffect(() => {
        const added = state.authPage.auth_data?.assigned_schools.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
        const result = added.filter(v => { return (v.territory == state.authPage.auth_data?.assigned_territory); });
        setData(result);
    }, []);

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        parent_name: yup
            .string()
            .required('Parent Name is required'),
        player_name: yup
            .string()
            .required('Player Name is required'),
        player_age: yup
            .string()
            .required('Player Age is required'),
        wristband_level: yup
            .string()
            .required('Wrist Band Level is required'),
        handed: yup
            .string()
            .required('Handed is required'),
        num_buddy_books_read: yup
            .string()
            .required('Number of Buddy Books Read  is required'),
        jersey_size: yup
            .string()
            .required('Jersey Size is required'),
        current_award: yup
            .string()
            .required('Current Award is required')
    });

    const handleAddCustomer = async (values) => {
        try {
            const data = {
                email: values.email,
                password: values.password,
                roles: ['customer'],
                parent_name: values.parent_name,
                player_name: values.player_name,
                player_age: values.player_age,
                wristband_level: values.wristband_level,
                school: selected,
                coach: state.authPage.auth_data?.coach_name,
                handed: values.handed,
                num_buddy_books_read: values.num_buddy_books_read,
                jersey_size: values.jersey_size,
                current_award: values.current_award
            };
            const result = await SignUpService(data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "Customer Added Successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("Coach Dashboard")
                        }
                    ]
                );
            }
        } catch (e) {
            Alert.alert(
                "Alert",
                "Failed! Email is already in use!"
            );
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Image source={buddy} style={{ width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
                <Formik
                    validationSchema={loginValidationSchema}
                    initialValues={{
                        email: '',
                        password: '',
                        parent_name: '',
                        player_name: '',
                        player_age: '',
                        wristband_level: '',
                        handed: '',
                        num_buddy_books_read: '',
                        jersey_size: '',
                        current_award: ''
                    }}
                    onSubmit={(values) => handleAddCustomer(values)}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        isValid,
                    }) => (
                        <>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                name="email"
                                placeholder="Email Address"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                            {errors.email &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                name="password"
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.input}
                            />
                            {errors.password &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                            <Text style={styles.label}>Parent Name</Text>
                            <TextInput
                                name="parent_name"
                                placeholder="Password"
                                onChangeText={handleChange('parent_name')}
                                onBlur={handleBlur('parent_name')}
                                value={values.parent_name}
                                style={styles.input}
                            />
                            {errors.parent_name &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.parent_name}</Text>
                            }
                            <Text style={styles.label}>Player Name</Text>
                            <TextInput
                                name="player_name"
                                placeholder="Player Name"
                                onChangeText={handleChange('player_name')}
                                onBlur={handleBlur('player_name')}
                                value={values.player_name}
                                style={styles.input}
                            />
                            {errors.player_name &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.player_name}</Text>
                            }
                            <Text style={styles.label}>Player Age</Text>
                            <TextInput
                                name="player_age"
                                placeholder="Player Age"
                                onChangeText={handleChange('player_age')}
                                onBlur={handleBlur('player_age')}
                                value={values.player_age}
                                style={styles.input}
                            />
                            {errors.player_age &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.player_age}</Text>
                            }
                            <Text style={styles.label}>WristBand Level</Text>
                            <TextInput
                                name="wristband_level"
                                placeholder="WristBand Level"
                                onChangeText={handleChange('wristband_level')}
                                onBlur={handleBlur('wristband_level')}
                                value={values.wristband_level}
                                style={styles.input}
                            />
                            {errors.wristband_level &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.wristband_level}</Text>
                            }
                            <Text style={styles.label}>Schools</Text>
                            <MultipleSelectList
                                setSelected={(val) => setSelected(val)}
                                data={data}
                                save="value"
                                onSelect={() => alert(selected)}
                                label="Selected Schools"
                            />
                            <Text style={styles.label}>Handed</Text>
                            <TextInput
                                name="handed"
                                placeholder="Handed"
                                onChangeText={handleChange('handed')}
                                onBlur={handleBlur('handed')}
                                value={values.handed}
                                style={styles.input}
                            />
                            {errors.handed &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.handed}</Text>
                            }
                            <Text style={styles.label}>Number of Buddy Books Read</Text>
                            <TextInput
                                name="num_buddy_books_read"
                                placeholder="Number of Buddy Books Read"
                                onChangeText={handleChange('num_buddy_books_read')}
                                onBlur={handleBlur('num_buddy_books_read')}
                                value={values.num_buddy_books_read}
                                style={styles.input}
                            />
                            {errors.num_buddy_books_read &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.num_buddy_books_read}</Text>
                            }
                            <Text style={styles.label}>Jersey Size</Text>
                            <TextInput
                                name="jersey_size"
                                placeholder="Jersey Size"
                                onChangeText={handleChange('jersey_size')}
                                onBlur={handleBlur('jersey_size')}
                                value={values.jersey_size}
                                style={styles.input}
                            />
                            {errors.jersey_size &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.jersey_size}</Text>
                            }
                            <Text style={styles.label}>Current Award</Text>
                            <TextInput
                                name="current_award"
                                placeholder="Current Award"
                                onChangeText={handleChange('current_award')}
                                onBlur={handleBlur('current_award')}
                                value={values.current_award}
                                style={styles.input}
                            />
                            {errors.current_award &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.current_award}</Text>
                            }
                            <Button
                                title="Submit"
                                color="#000"
                                style={{ marginTop: 40, marginBottom: 40 }}
                                onPress={handleSubmit}
                            />
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
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
    }
});
