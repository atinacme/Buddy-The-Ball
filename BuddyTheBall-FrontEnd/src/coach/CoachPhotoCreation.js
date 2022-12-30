import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, View, Button } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from "react-redux";
import { CoachPhotoUploadService } from '../services/CoachService';
import { GetCustomerWithSchoolIdService } from '../services/CustomerService';

export default function CoachPhotoCreation() {
    const [data, setData] = useState([]);
    const [schoolId, setSchoolId] = useState();
    const [customerData, setCustomerData] = useState([]);
    const [customerId, setCustomerId] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const state = useSelector((state) => state);

    useEffect(() => {
        const result = state.authPage.auth_data.assigned_schools.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
        setData(result);
    }, []);

    const handleStudentList = async (id) => {
        setSchoolId(id);
        const result = await GetCustomerWithSchoolIdService(id);
        if (result) {
            setCustomerData(result.map(v => Object.assign(v, { key: v._id, value: v.player_name })));
        }
    };

    const openGallery = async () => {
        const result = await ImagePicker.openPicker({
            multiple: true
        });
        setSelectedFile(result);
        console.log('rsss->', result);
        const formData = new FormData();
        formData.append('customer_id', customerId);
        formData.append('school_id', schoolId);
        formData.append('coach_id', 'Image Upload');
        result.forEach((item) => {
            const newImageUri = "file:///" + item.path.split("file:/").join("");
            formData.append('file', {
                uri: newImageUri,
                type: item.mime,
                name: newImageUri.split("/").pop()
            });
        });
        const res = await CoachPhotoUploadService(formData);
        if (res) {
            console.log('Upload Successful', res.data);
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.label}>Students List</Text>
                <SelectList
                    setSelected={(val) => handleStudentList(val)}
                    data={data}
                    save="key"
                />
                <SelectList
                    setSelected={(val) => setCustomerId(val)}
                    data={customerData}
                    save="key"
                />
                <View>
                    <Button onPress={openGallery} title='upload' />
                    {selectedFile !== null && selectedFile.map((ls, index) => {
                        return (<View key={index}>
                            <Image source={{ uri: ls.path }} style={{ height: 300, width: 300 }} />
                        </View>);
                    })}
                </View>
                {/* <Button
                title="Submit"
                color="#000"
                style={{ marginTop: 40, marginBottom: 40 }}
                onPress={handleSignUp}
            /> */}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
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
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    }
});
