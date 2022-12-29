import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, View, Button } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from "react-native-document-picker";
import { FAB, Portal, Provider } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import buddy from '../assets/buddy.png';
import { useSelector } from "react-redux";
import { SignUpService } from '../services/UserAuthService';
import user from '../assets/user.png';
import axios from 'axios';

export default function CoachPhotoCreation() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const state = useSelector((state) => state);

    useEffect(() => {
        const result = state.authPage.auth_data.alloted_schools.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
        setData(result);
    }, []);

    const [customerData, setCustomerData] = useState({
        email: "",
        password: "",
        parent_name: "",
        player_age: "",
        wristband_level: "",
        handed: "",
        num_buddy_books_read: "",
        jersey_size: "",
        class_photos: "",
        current_award: "",
        message: ""
    });

    var options = {
        title: "Select Image",
        type: 'library',
        options: {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false
        }
    };

    const openGallery = async () => {
        const result = await ImagePicker.openPicker({
            multiple: true
        });
        // const images = await launchImageLibrary(options);
        console.log('rsss->', result);
        const formData = new FormData();
        result.forEach((item) => {
            formData.append('file', {
                uri: item.uri,
                type: item.type,
                name: 'cdfghdghd'
            });
        });
        let res = await fetch('http://localhost:8080/api/uploadCustomerPhotos', {
            method: 'POST',
            body: formData,
        });
        let responseJson = await res.json();
        if (responseJson) {
            console.log('Upload Successful', responseJson);
        }
    };

    // const uploadImage = async () => {
    //     // Check if any file is selected or not
    //     if (selectedFile != null) {
    //         // If file selected then create FormData
    //         // const fileToUpload = selectedFile;
    //         console.log('fileToUpload--->', selectedFile);
    //         const formData = new FormData();
    //         // data.append('customer_id', 'Image Upload');
    //         // data.append('school_id', 'Image Upload');
    //         // data.append('coach_id', 'Image Upload');
    //         // formData.append('file[]', selectedFile);
    //         // selectedFile.forEach((file, i) => {
    //         //     formData.append(`file-${i}`, file, file.name);
    //         // });
    //         const data = new FormData();

    //         //images selected from image picker(react-native-image-crop-picker) library 

    //         selectedFile.forEach((item, i) => {
    //             data.append("file", {
    //                 uri: item.uri,
    //                 type: "image/jpeg",
    //                 name: item.filename || `filename${i}.jpg`,
    //             });
    //         });
    //         let res = await fetch('http://localhost:8080/api/uploadCustomerPhotos', {
    //             method: 'POST',
    //             body: formData,
    //         });
    //         let responseJson = await res.json();
    //         if (responseJson.status == 200) {
    //             alert('Upload Successful');
    //         }
    //     } else {
    //         // If no file selected the show alert
    //         alert('Please Select File first');
    //     }
    // };

    // const selectFile = async () => {
    //     // Opening Document Picker to select one file
    //     try {
    //         const res = await DocumentPicker.pickMultiple({
    //             type: [DocumentPicker.types.images],
    //             presentationStyle: 'fullScreen'
    //         });
    //         // Printing the log realted to the file
    //         console.log('res : ' + JSON.stringify(res));
    //         // Setting the state to show single file attributes
    //         setSelectedFile(res);
    //     } catch (err) {
    //         setSelectedFile(null);
    //         // Handling any exception (If any)
    //         if (DocumentPicker.isCancel(err)) {
    //             // If user canceled the document selection
    //             alert('Canceled');
    //         } else {
    //             // For Unknown Error
    //             alert('Unknown Error: ' + JSON.stringify(err));
    //             throw err;
    //         }
    //     }
    // };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.label}>Students List</Text>
                <MultipleSelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                />
                <View>
                    <Button onPress={openGallery} title='upload' />
                </View>
                {/* <View style={styles.mainBody}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={selectFile}>
                        <Text style={styles.buttonTextStyle}>Select File</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={uploadImage}>
                        <Text style={styles.buttonTextStyle}>Upload File</Text>
                    </TouchableOpacity>

                    {selectedFile !== null && selectedFile.map((ls, index) => {
                        return (<View key={index}>
                            <Image source={{ uri: ls.uri }} style={{ height: 300, width: 300 }} />
                        </View>);
                    })}
                </View> */}
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
