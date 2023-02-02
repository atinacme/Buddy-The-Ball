import React, { useState, useEffect } from 'react';
import { Text, Image, SafeAreaView, View, StyleSheet, StatusBar, Button, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import buddyBoy from '../assets/buddyGirl.png';
import axios from 'axios';
import Config from '../../Config';
import { GetParticularCoachService } from '../services/CoachService';
import { AuthPageAction } from '../redux/Actions';

export default function CoachDashboard({ navigation }) {
    const state = useSelector((state) => state);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCoachData = async () => {
            const result = await GetParticularCoachService(state.authPage.auth_data._id);
            if (result) {
                dispatch(AuthPageAction(state.authPage.id, state.authPage.email, state.authPage.roles, result, state.authPage.accessToken));
                setUploadResult(false);
            }
        };
        if (uploadResult) {
            getCoachData();
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
        formData.append('coach_id', state.authPage.auth_data._id);
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
            <Text style={styles.dashimgWrap}>
                <TouchableOpacity onPress={openGallery}>
                    {state.authPage.auth_data.profile_data && state.authPage.auth_data.profile_data.url ?
                        <Image source={{ uri: state.authPage.auth_data.profile_data.url }} style={{ width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto' }} />
                        :
                        <>
                            {selectedFile !== null ?
                                <Image source={{ uri: selectedFile[0].path }} style={{ width: 200, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10 }} />
                                :
                                <Image source={buddyBoy} style={{ width: 200, height: 150, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10 }} />
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
                    <Text style={styles.heading}>Coach {state.authPage.auth_data.coach_name}</Text>
                    <Text style={styles.txt}>Tennis Club: {state.authPage.auth_data.tennis_club}</Text>
                    <Text style={styles.txt}>Favorite Pro Player: {state.authPage.auth_data.favorite_pro_player}</Text>
                    <Text style={styles.txt}>Handed: {state.authPage.auth_data.handed}</Text>
                    <Text style={styles.txt}>Favorite Drill: {state.authPage.auth_data.favorite_drill}</Text>
                </>
            )}
            <View style={styles.btnCta}>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="PHOTOS"
                        color="#000"
                        style={styles.cta}
                        onPress={() => navigation.navigate("Coach Schools Photos")}
                    />
                </View>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="CALENDAR"
                        color="#000"
                        onPress={() => navigation.navigate("Coach Calendar")}
                    />
                </View>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="MESSAGES"
                        color="#000"
                        onPress={() => navigation.navigate("Coach Messages")}
                    />
                </View>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="SCHOOLS"
                        color="#000"
                        onPress={() => navigation.navigate("Coach School List")}
                    />
                </View>
                <View style={styles.btnCtawrap}>
                    <Button
                        title="Customer Creation"
                        color="#000"
                        style={styles.cta}
                        onPress={() => navigation.navigate("Customer Creation")}
                    />
                </View>
            </View>
            <Button
                title="Logout"
                color="#000"
                style={{ marginTop: 40, marginBottom: 40 }}
                onPress={() => {
                    navigation.navigate("SignIn");
                    dispatch(AuthPageAction('', '', '', '', ''));
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
        fontFamily: 'LemonJuice'
    },
    title: {
        fontSize: 24,
        fontFamily: 'LemonJuice'
    },
    txt: {
        fontFamily: 'LemonJuice',
        textAlign: 'center',
        fontSize: 18,
    },
    dashimgWrap: {
        textAlign: 'center'
    },
    label: {
        fontSize: 18,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'LemonJuice'
    },
    dashContentWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    dashContent: {
        width: 180
    },
    heading: {
        fontSize: 25,
        textAlign: 'center',
        padding: 5,
        fontFamily: 'LemonJuice'
    },
    wrapper: {
        paddingTop: 0,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    playPara: {
        textAlign: 'center',
        color: '#000',
        fontFamily: 'LemonJuice'
    },
    btnCta: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        fontFamily: 'LemonJuice'
    },
    cta: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        fontFamily: 'LemonJuice'
    },
    btnCtawrap: {
        width: 160,
        marginBottom: 10,
        fontFamily: 'LemonJuice'
    }
});
