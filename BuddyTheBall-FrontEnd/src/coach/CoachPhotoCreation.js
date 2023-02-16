import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView, Image, Alert, View, Button } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from "react-redux";
import { GetCustomerWithSchoolIdService } from '../services/CustomerService';
import axios from 'axios';
import Config from '../../Config';

export default function CoachPhotoCreation({ navigation, route }) {
    const [customerData, setCustomerData] = useState([]);
    const [customerId, setCustomerId] = useState();
    const [selectedFile, setSelectedFile] = useState(null);
    const state = useSelector((state) => state);

    useEffect(() => {
        try {
            const handleStudentList = async () => {
                const result = await GetCustomerWithSchoolIdService(route.params.schoolId);
                if (result) {
                    setCustomerData(result.map(v => Object.assign(v, { key: v._id, value: v.player_name })));
                }
            };
            handleStudentList();
        } catch (e) { }
    }, []);

    const openGallery = async () => {
        const result = await ImagePicker.openPicker({
            multiple: true
        });
        setSelectedFile(result);
    };

    const handleAddPhoto = async () => {
        const formData = new FormData();
        formData.append('customer_id', customerId);
        formData.append('school_id', route.params.schoolId);
        formData.append('coach_id', state.authPage.auth_data?._id);
        formData.append('file_type', 'customer_photos');
        selectedFile.forEach((item) => {
            const newImageUri = "file:///" + item.path.split("file:/").join("");
            formData.append('file', {
                uri: newImageUri,
                type: item.mime,
                name: newImageUri.split("/").pop()
            });
        });
        const res = await axios({
            method: 'post',
            url: `${Config.REACT_APP_BASE_URL}/uploadCustomerPhotos`,
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });
        if (res) {
            Alert.alert(
                "Alert",
                "All Files Uploaded Sucessfully",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setSelectedFile(null);
                            navigation.navigate("Coach Schools Photos");
                        }
                    }
                ]
            );
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.label}>Students List</Text>
                <SelectList
                    setSelected={(val) => setCustomerId(val)}
                    data={customerData}
                    save="key"
                />
                <View style={{ marginTop: 20 }}>
                    <Button onPress={openGallery} title='upload' />
                    {selectedFile !== null && selectedFile.map((ls, index) => {
                        return (
                            <View key={index}>
                                <Image source={{ uri: ls.path }} style={{ height: 300, width: 300, marginTop: 20, marginBottom: 20 }} />
                            </View>
                        );
                    })}
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Submit"
                        color="#000"
                        onPress={handleAddPhoto}
                    />
                </View>
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
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 0
    }
});
