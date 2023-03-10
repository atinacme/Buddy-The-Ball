import React, { useCallback, useEffect, useState } from 'react';
import {
    SafeAreaView, TouchableOpacity, StyleSheet, Text, Modal, View, Pressable, TextInput, ScrollView
} from 'react-native';
import { useSelector } from "react-redux";
import { SelectList } from 'react-native-dropdown-select-list';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import { CreateAgendaService, GetAgendaByDateAndCoachService, UpdateAgendaService } from '../services/CalendarService';
import LinearGradient from 'react-native-linear-gradient';

export default function CoachCalendar({ navigation }) {
    const state = useSelector((state) => state);
    const schoolData = state.authPage.auth_data?.assigned_schools.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
    const [modalVisible, setModalVisible] = useState(false);
    const [agendaData, setAgendaData] = useState([]);
    const [updateAgenda, setUpdateAgenda] = useState(false);
    const [items, setItems] = useState({});
    const today = moment().format("YYYY-MM-DD");
    const [newDay, setNewDay] = useState(today);
    const [loadResult, setLoadResult] = useState();
    const [allDates, setAllDates] = useState([]);

    useEffect(() => {
        const result = state.authPage.auth_data?.assigned_schools.filter(v => { return (v.region == state.authPage.auth_data?.assigned_region); });
        const assign_school = result[0].school_name;
        state.authPage.auth_data?.assign_slot.filter(element => {
            if (element.school === assign_school) {
                let timeStartStamp = moment(element.startDate);
                let timeEndStamp = moment(element.endDate);
                setAllDates([timeStartStamp, timeEndStamp]);
                setNewDay(moment(timeStartStamp).format("YYYY-MM-DD"));
            }
        });
    }, []);
    console.log('items---->', moment(allDates[0]).format("YYYY-MM-DD"), moment(allDates[1]).format("YYYY-MM-DD"));

    useEffect(() => {
        // if (allDates.length > 0) {
        const handleOnLoadAgenda = async () => {
            try {
                const data = { agenda_date: newDay, user_id: state.authPage.auth_data?.user_id };
                const result = await GetAgendaByDateAndCoachService(data);
                console.log("result---->", result);
                if (result) {
                    setItems(result[0] ? result[0].agenda : {});
                    setLoadResult(result[0]);
                }
            } catch (e) { setItems(); }
        };
        handleOnLoadAgenda();
        // const timer = setTimeout(() => handleOnLoadAgenda(), 1000);
        // return () => clearTimeout(timer);
        // }
    }, [newDay, updateAgenda]);

    console.log('items hth---->', items);


    const handleRenderAgenda = () => {
        setUpdateAgenda(false);
        setModalVisible(!modalVisible);
        setNewDay(loadResult.agenda_date);
        setAgendaData(loadResult.agenda_data);
    };

    const handleAgenda = async (key) => {
        if (key !== 1) {
            try {
                const data = {
                    coach_id: state.authPage.auth_data?._id,
                    user_id: state.authPage.auth_data?.user_id,
                    agenda_date: newDay,
                    agenda_data: agendaData
                };
                const result = await UpdateAgendaService(key, data);
                if (result) {
                    setItems(result.agenda);
                    setUpdateAgenda(true);
                    setModalVisible(!modalVisible);
                }
            } catch (e) { }
        } else {
            try {
                const data = {
                    coach_id: state.authPage.auth_data?._id,
                    user_id: state.authPage.auth_data?.user_id,
                    agenda_date: newDay,
                    agenda_data: agendaData
                };
                const result = await CreateAgendaService(data);
                if (result) {
                    setItems(result.data.agenda);
                    setModalVisible(!modalVisible);
                }
            } catch (e) { }
        }
    };

    const handleOnDayPress = useCallback((day) => {
        setNewDay(day.dateString);
        // setTimeout(() => {
        setUpdateAgenda(false);
        console.log("ddfn---->", items, modalVisible,);
        if (items !== undefined) {
            setModalVisible(false);
            // setNewDay(day.dateString);
        } else {
            setModalVisible(true);
            // setNewDay(day.dateString);
        }
        setAgendaData([]);
        setLoadResult();
        // }, 1000);
    }, [items]);

    return (
        <>
            <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
                <SafeAreaView style={styles.wrapper}>
                    <Agenda
                        minDate={moment(allDates[0]).format("YYYY-MM-DD")}
                        maxDate={moment(allDates[1]).format("YYYY-MM-DD")}
                        pastScrollRange={0}
                        futureScrollRange={1}
                        dayLoading={false}
                        items={items}
                        selected={moment(allDates[0]).format("YYYY-MM-DD")}
                        renderItem={(item) => (
                            <TouchableOpacity style={styles.item} onPress={handleRenderAgenda}>
                                <Text style={styles.itemTextFirst}>School:</Text><Text style={styles.itemText}>{item.school}</Text>
                                <Text style={styles.itemTextFirst}>Agenda:</Text><Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        onDayPress={(day) => handleOnDayPress(day)}
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
                                                <View key={index}>
                                                    <Text>Agenda {index + 1}</Text>
                                                    {loadResult && item.school ?
                                                        <TextInput
                                                            style={styles.input}
                                                            value={item.school}
                                                        />
                                                        :
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
                                                    }
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
                                            onPress={() => handleAgenda(key = loadResult?._id ? loadResult?._id : 1)}>
                                            <Text style={styles.textStyle}>{loadResult ? 'Update' : 'Create'}</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                                setAgendaData([]);
                                            }}>
                                            <Text style={styles.textStyle}>{loadResult ? "Don't Update !!" : "Don't Create !!"}</Text>
                                        </Pressable>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Coach Dashboard")}>
                        <Text style={styles.backbtn}>Back</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        </>
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
        // flex: 1,
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