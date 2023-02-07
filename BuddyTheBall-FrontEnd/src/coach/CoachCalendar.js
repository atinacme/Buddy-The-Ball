import React, { useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Text,
    Button,
    Modal,
    View,
    Pressable, TextInput, Alert
} from 'react-native';
import { Agenda } from 'react-native-calendars';
// import ApiCalendar from 'react-google-calendar-api';

// const config = {
//     "clientId": "102419677833205658481",
//     "apiKey": "AIzaSyD-TcDcUYtfFKABjO-VlbtI2HoOsXqFKX8",
//     "scope": "https://www.googleapis.com/auth/calendar",
//     "discoveryDocs": [
//         "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
//     ]
// };

// const apiCalendar = new ApiCalendar(config);

export default function CoachCalendar() {

    const [modalVisible, setModalVisible] = useState(false);
    const [newDate, setNewDate] = useState();
    const [agenda, setAgenda] = useState("");
    const [agendaData, setAgendaData] = useState([]);
    const items = {
        '2022-12-01': [{ name: 'Cycling' }, { name: 'Walking' }, { name: 'Running' }],
        '2022-12-02': [{ name: 'Writing' }]
    };
    console.log("outside---->", agendaData);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Agenda
                    // selected="2022-12-01"
                    items={items}
                    renderItem={(item, isFirst) => (
                        <TouchableOpacity style={styles.item}>
                            {console.log("item---->", item, isFirst)}
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    onDayPress={day => {
                        if (day.dateString) {
                            setModalVisible(true);
                            setNewDate(day.dateString);
                            // items.day.dateString = 
                        }
                        console.log('day pressed', day);
                    }}
                />
            </SafeAreaView>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Create Your Agenda
                                <Pressable
                                    style={[styles.agendaButton, styles.buttonOpen]}
                                    onPress={() => {
                                        setAgendaData([...agendaData, { name: '' }]);
                                        console.log(agendaData);
                                    }}>
                                    <Text style={styles.textStyle}>+</Text>
                                </Pressable>
                            </Text>
                            {agendaData.length > 0 && agendaData.map((item, index) => {
                                return (
                                    <View>
                                        <Text>Agenda {index + 1}</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={(e) => {
                                                let newArr = [...agendaData];
                                                newArr[index].name = e;
                                                setAgendaData(newArr);
                                                console.log("xgxh--->", item);
                                            }}
                                            value={item.name}
                                        />
                                        <Pressable
                                            style={[styles.agendaButton, styles.buttonOpen]}
                                            onPress={() => {
                                                console.log('index', index);
                                                // agendaData.filter(item => item !== index);
                                                // setAgendaData(agendaData)
                                            }}>
                                            <Text style={styles.textStyle}>X</Text>
                                        </Pressable>
                                    </View>
                                );
                            })}
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => {
                                    items.newDate = agenda;
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Create</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Don't Create !!</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        width: 150
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        // height: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 45,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    agendaButton: {
        borderRadius: 50,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    buttonOpen: {
        backgroundColor: '#2196F3',
    },
    buttonClose: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        marginRight: 10,
        textAlign: 'center',
        width: 250
    }
});