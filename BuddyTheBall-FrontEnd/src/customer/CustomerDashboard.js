import React, { useState, useEffect } from 'react';
import { Text, Image, SafeAreaView, View, StyleSheet, StatusBar, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import spark from '../assets/spark.png';
import { useSelector, useDispatch } from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import buddyGirl from '../assets/buddyGirl.png';
import axios from 'axios';
import Config from '../../Config';
import { GetParticularCustomerService } from '../services/CustomerService';
import { AuthPageAction } from '../redux/Actions';

export default function CustomerDashboard({ navigation }) {
    const state = useSelector((state) => state);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCustomerData = async () => {
            const result = await GetParticularCustomerService(state.authPage.auth_data._id);
            if (result) {
                dispatch(AuthPageAction(state.authPage.id, state.authPage.email, state.authPage.roles, result, state.authPage.accessToken));
                setUploadResult(false);
            }
        };
        if (uploadResult) {
            getCustomerData();
        }
    }, [uploadResult]);

    const openGallery = async () => {
        const result = await ImagePicker.openPicker({
            multiple: true
        });
        setSelectedFile(result);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('customer_id', state.authPage.auth_data._id);
        formData.append('role', state.authPage.roles[0]);
        formData.append('file_type', 'profile');
        const newImageUri = "file:///" + selectedFile[0].path.split("file:/").join("");
        formData.append('file', {
            uri: newImageUri,
            type: selectedFile[0].mime,
            name: newImageUri.split("/").pop()
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
                "Profile Picture Uploaded Sucessfully",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setSelectedFile(null);
                            setUploadResult(true);
                        }
                    }
                ]
            );
        }
    };

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.dashimgWrap}>
                    <TouchableOpacity onPress={openGallery}>
                        {state.authPage.auth_data.profile_data && state.authPage.auth_data.profile_data.url ?
                            <Image source={{ uri: state.authPage.auth_data.profile_data.url }} style={{ width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }} />
                            :
                            <>
                                {selectedFile !== null ?
                                    <Image source={{ uri: selectedFile[0].path }} style={{ width: 200, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10 }} />
                                    :
                                    <Image source={buddyGirl} style={{ width: 200, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10 }} />
                                }
                            </>
                        }
                    </TouchableOpacity>
                </Text>
                {selectedFile !== null && (
                    <Button
                        title="Upload"
                        color="#000"
                        style={{ marginTop: 40, marginBottom: 40 }}
                        onPress={handleUpload}
                    />
                )}
                {state.authPage.auth_data.profile_data && state.authPage.auth_data.profile_data.url === undefined ? <Text style={styles.playPara}>Upload Player Picture</Text> : null}
                {state.authPage.auth_data && (
                    <>
                        <Text style={styles.heading}>{state.authPage.auth_data.player_name}</Text>
                        <Text>Parent Name: {state.authPage.auth_data.parent_name}</Text>
                        <Text>Player Age: {state.authPage.auth_data.player_age}</Text>
                        <Text>Wristband Level: {state.authPage.auth_data.wristband_level}</Text>
                        <Text>Handed: {state.authPage.auth_data.handed}</Text>
                        <Text>Number of Buddy Books Read: {state.authPage.auth_data.num_buddy_books_read}</Text>
                        <Text>Jersey Size: {state.authPage.auth_data.jersey_size}</Text>
                        <Text>School Name: {state.authPage.auth_data.school && state.authPage.auth_data.school.school_name ? state.authPage.auth_data.school.school_name : null}</Text>
                        <Text>Coach Name: {state.authPage.auth_data.coach && state.authPage.auth_data.coach.coach_name ? state.authPage.auth_data.coach.coach_name : null}</Text>
                    </>
                )}
                <View style={styles.dashContentWrap}>
                    <View style={styles.dashContent}>
                        <Text style={styles.label}>Class Photos</Text>
                        <Button
                            title="ENTER"
                            color="#000"
                            onPress={() => navigation.navigate("Customer Photos")}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Current Award</Text>
                        <Image source={spark} style={{ width: 40, height: 40, marginLeft: 'auto', marginRight: 'auto' }} />
                    </View>
                </View>
                <View>
                    <Text style={styles.label}>Message School Coach</Text>
                    <Button
                        title="MESSAGE"
                        color="#000"
                        onPress={() => navigation.navigate("Customer Messages")}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Logout"
                        color="#000"
                        onPress={() => {
                            navigation.navigate("SignIn");
                            dispatch(AuthPageAction('', '', '', '', ''));
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    scrollView: {
        marginHorizontal: 20,
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        color: '#000',
        paddingBottom: 20
    },
    wrapper: {
        paddingTop: 0,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    playPara: {
        textAlign: 'center',
        color: '#000'
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        padding: 20
    },
    dashimgWrap: {
        textAlign: 'center'
    },
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10
    },
    dashContentWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dashContent: {
        width: 180
    }
});
