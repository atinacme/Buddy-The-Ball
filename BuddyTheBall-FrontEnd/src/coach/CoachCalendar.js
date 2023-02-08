import React, { useState } from 'react';
import {
    SafeAreaView, TouchableOpacity, StyleSheet, Text, Modal, View, Pressable, TextInput, ScrollView
} from 'react-native';
import { useSelector } from "react-redux";
import { SelectList } from 'react-native-dropdown-select-list';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';

export default function CoachCalendar() {
    const state = useSelector((state) => state);
    const schoolData = state.authPage.auth_data.assigned_schools.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
    const [modalVisible, setModalVisible] = useState(false);
    const [newDay, setNewDay] = useState();
    const [agendaData, setAgendaData] = useState([]);
    const [items, setItems] = useState({});
    const today = moment().format("YYYY-MM-DD");
    console.log("outside---->", agendaData, items);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Agenda
                    // selected="2022-12-01"
                    minDate={today}
                    items={items}
                    renderItem={(item) => (
                        <TouchableOpacity style={styles.item}>
                            <Text style={styles.itemTextFirst}>School:</Text><Text style={styles.itemText}>{item.school}</Text>
                            <Text style={styles.itemTextFirst}>Agenda:</Text><Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    onDayPress={day => {
                        if (Object.keys(items).indexOf(day.dateString) > -1) {
                            setModalVisible(false);
                            setNewDay(day.dateString);
                        } else {
                            setModalVisible(true);
                            setNewDay(day.dateString);
                        }
                        setAgendaData([]);
                    }}
                />
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                            setAgendaData([]);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <ScrollView style={styles.scrollView}>
                                    <View style={styles.modalText}>
                                        <Text style={styles.mainText}>Create Your Agenda</Text>
                                        <Pressable
                                            style={[styles.plusButton, styles.buttonOpen]}
                                            onPress={() => {
                                                setAgendaData([...agendaData, { name: '' }]);
                                            }}>
                                            <Text style={styles.textPlus}>+</Text>
                                        </Pressable>
                                    </View>
                                    {agendaData.length > 0 && agendaData.map((item, index) => {
                                        return (
                                            <View>
                                                <Text>Agenda {index + 1}</Text>
                                                <View style={styles.schoolList}>
                                                    <SelectList
                                                        setSelected={(val) => {
                                                            let newArr = [...agendaData];
                                                            newArr[index].school = val;
                                                            setAgendaData(newArr);
                                                        }}
                                                        data={schoolData}
                                                        save="value"
                                                    />
                                                </View>
                                                <View style={{
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <TextInput
                                                        style={styles.input}
                                                        onChangeText={(e) => {
                                                            let newArr = [...agendaData];
                                                            newArr[index].name = e;
                                                            setAgendaData(newArr);
                                                        }}
                                                        value={item.name}
                                                    />
                                                    <Pressable
                                                        style={[styles.agendaButton, styles.buttonClose]}
                                                        onPress={() => {
                                                            var array = [...agendaData];
                                                            var indexData = array.indexOf(item);
                                                            console.log('index', indexData);
                                                            if (indexData !== -1) {
                                                                array.splice(indexData, 1);
                                                                setAgendaData(array);
                                                            }
                                                        }}>
                                                        <Text style={styles.agendaCrossBtn}>X</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        );
                                    })}
                                    <Pressable
                                        style={[styles.button, styles.buttonOpen]}
                                        onPress={() => {
                                            setItems({ ...items, [newDay]: agendaData });
                                            setModalVisible(!modalVisible);
                                        }}>
                                        <Text style={styles.textStyle}>Create</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                            setAgendaData([]);
                                        }}>
                                        <Text style={styles.textStyle}>Don't Create !!</Text>
                                    </Pressable>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    scrollView: {
        marginHorizontal: 20,
        marginVertical: 20,
        maxHeight: 190
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        width: 180
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    agendaButton: {
        borderRadius: 50,
        elevation: 2,
        // marginLeft: 30,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    agendaCrossBtn: {
        fontSize: 15,
    },
    buttonOpen: {
        backgroundColor: '#2196F3'
    },
    plusButton: {
        borderRadius: 50,
        elevation: 2,
        width: 30,
        height: 30,
        alignItems: 'center'
    },
    mainText: {
        marginRight: 40
    },
    textPlus: {
        fontSize: 20,
    },
    buttonClose: {
        backgroundColor: 'red'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        flexDirection: 'row'
    },
    schoolList: {
        width: 225,
        marginTop: 10,
        marginBottom: 10
    },
    itemTextFirst: {
        color: 'black'
    }
});