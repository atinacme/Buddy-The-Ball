import React from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, Button, Image, Alert, ScrollView, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import buddy from '../assets/buddy.png';
import { SchoolCreationService } from '../services/SchoolService';
import { Formik } from 'formik';
import * as yup from 'yup';

export default function SuperAdminSchoolCreation({ navigation }) {
    const territoryList = [
        {
            key: "Kanpur",
            value: "Kanpur"
        },
        {
            key: "Lucknow",
            value: "Lucknow"
        },
        {
            key: "Allahabad",
            value: "Allahabad"
        },
        {
            key: "Banaras",
            value: "Banaras"
        }
    ];
    const dayList = [
        {
            key: "Monday",
            value: "Monday"
        },
        {
            key: "Tuesday",
            value: "Tuesday"
        },
        {
            key: "Wednesday",
            value: "Wednesday"
        },
        {
            key: "Thursday",
            value: "Thursday"
        },
        {
            key: "Friday",
            value: "Friday"
        },
        {
            key: "Saturday",
            value: "Saturday"
        },
        {
            key: "Sunday",
            value: "Sunday"
        }
    ];
    const loginValidationSchema = yup.object().shape({
        school_name: yup
            .string()
            .required('School Name is Required'),
        territory: yup
            .string()
            .required('Territory is required'),
        assigned_day: yup
            .string()
            .required('Assigned Day is required')
    });

    const handleAddSchool = async (values) => {
        try {
            const data = {
                school_name: values.school_name,
                territory: values.territory,
                assigned_day: values.assigned_day,
            };
            const result = await SchoolCreationService(data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "School Added Successfully",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.navigate("SuperAdmin Dashboard")
                        }
                    ]
                );
            }
        } catch (e) {
            Alert.alert(
                "Alert",
                "Failed! Can't add School!"
            );
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Image source={buddy} style={{ width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
                <Formik
                    validationSchema={loginValidationSchema}
                    initialValues={{ school_name: '', territory: '', assigned_day: '' }}
                    onSubmit={(values) => handleAddSchool(values)}
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
                            <Text style={styles.label}>School Name</Text>
                            <TextInput
                                name="school_name"
                                placeholder="School"
                                onChangeText={handleChange('school_name')}
                                onBlur={handleBlur('school_name')}
                                value={values.school}
                                style={styles.input}
                            />
                            {errors.school_name &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.school_name}</Text>
                            }
                            <Text style={styles.label}>Territory</Text>
                            <SelectList
                                setSelected={handleChange('territory')}
                                data={territoryList}
                                save="key"
                            />
                            {errors.territory &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.territory}</Text>
                            }
                            <Text style={styles.label}>Assigned Day</Text>
                            <SelectList
                                setSelected={handleChange('assigned_day')}
                                data={dayList}
                                save="key"
                            />
                            {errors.assigned_day &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.assigned_day}</Text>
                            }
                            <View style={{ marginTop: 20 }}>
                                <Button
                                    disabled={!isValid}
                                    title="Submit"
                                    color="#000"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    scrollView: {
        marginHorizontal: 20,
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
    labeLink: {
        fontSize: 14,
        textAlign: 'center',
        color: "#000",
        padding: 10,
        cursor: 'pointer'
    }
});
