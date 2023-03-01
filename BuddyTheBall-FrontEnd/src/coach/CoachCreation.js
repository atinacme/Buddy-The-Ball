import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Button, Image, Alert, ScrollView, View, Modal, Pressable } from "react-native";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import buddy from '../assets/buddy.png';
import { GetSchoolsService } from '../services/SchoolService';
import { SignUpService } from '../services/UserAuthService';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

export default function CoachCreation({ navigation }) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    const [isStartDatePicked, setIsStartDatePicked] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [assignSlot, setAssignSlot] = useState([]);
    const [assignCal, setAssignCal] = useState({
        timePeriod: '',
        startDate: '',
        endDate: '',
        school: ''
    });
    const [coachData, setCoachData] = useState({
        email: "",
        password: "",
        coach_name: "",
        assigned_territory: "",
        tennis_club: "",
        favorite_pro_player: "",
        handed: "",
        favorite_drill: ""
    });
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

    useEffect(() => {
        try {
            const getAllSchools = async () => {
                const result = await GetSchoolsService();
                result.map(v => Object.assign(v, { key: v._id, value: v.school_name }));
                setData(result);
            };
            getAllSchools();
        } catch (e) { }
    }, []);

    function dateRange(startDate, endDate, steps = 1) {
        const dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            let dateNew = moment(new Date(currentDate)).format('YYYY-MM-DD');
            dateArray.push(dateNew);
            currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
        dateArray.shift();
        return dateArray;
    }

    const onDayPress = (day) => {
        if (isStartDatePicked == false) {
            let markedDates = {};
            markedDates[day.dateString] = { startingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
            setMarkedDates(markedDates);
            setIsStartDatePicked(true);
            setStartDate(day.dateString);
            setAssignCal({ ...assignCal, startDate: day.dateString });
        } else {
            let endDate = moment(day.dateString);
            let range = endDate.diff(startDate, 'days');
            let allRange = dateRange(startDate, endDate);
            let currentDate = new Date(endDate);
            let utcEndDate = currentDate.setUTCDate(currentDate.getUTCDate());
            let newDate = moment(new Date(utcEndDate)).format('YYYY-MM-DD');
            allRange.push(newDate);
            if (range > 0) {
                for (let i = 0; i <= allRange.length - 1; i++) {
                    markedDates[allRange[i]] = { color: '#50cebb', textColor: '#FFFFFF' };
                }
                markedDates[Object.keys(markedDates)[Object.keys(markedDates).length - 1]] = { endingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
                setMarkedDates(markedDates);
                setIsStartDatePicked(false);
                setStartDate('');
                setAssignCal({ ...assignCal, timePeriod: markedDates, endDate: day.dateString });
            } else {
                alert('Select an upcomming date!');
            }
        }
    };

    const handleCreate = () => {
        setAssignSlot(prevState => [...prevState, assignCal]);
        setModalVisible(!modalVisible);
        setMarkedDates([]);
        setAssignCal({
            timePeriod: '',
            startDate: '',
            endDate: '',
            school: ''
        });
    };

    const handleSignUp = async () => {
        try {
            const data = {
                email: coachData.email,
                password: coachData.password,
                roles: ['coach'],
                coach_name: coachData.coach_name,
                assigned_territory: coachData.assigned_territory,
                assigned_schools: selected,
                assign_slot: assignSlot,
                tennis_club: coachData.tennis_club,
                favorite_pro_player: coachData.favorite_pro_player,
                handed: coachData.handed,
                favorite_drill: coachData.favorite_drill
            };
            const result = await SignUpService(data);
            if (result) {
                Alert.alert(
                    "Alert",
                    "Coach Added Successfully",
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
                "Failed! Email is already in use!"
            );
        }
    };

    return (
        <LinearGradient colors={['#BCD7EF', '#D1E3AA', '#E3EE68', '#E1DA00']} style={styles.linearGradient}>
            <SafeAreaView style={styles.wrapper}>
                <ScrollView style={styles.scrollView}>
                    {/* <Text style={styles.heading}>Coach Creation</Text> */}
                    <Image source={buddy} style={{ width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto' }} />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setCoachData({ ...coachData, email: e })}
                        value={coachData.email}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setCoachData({ ...coachData, password: e })}
                        value={coachData.password}
                    />
                    <Text style={styles.label}>Coach Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setCoachData({ ...coachData, coach_name: e })}
                        value={coachData.coach_name}
                    />
                    <Text style={styles.label}>Assigned Territory</Text>
                    <SelectList
                        setSelected={(val) => setCoachData({ ...coachData, assigned_territory: val })}
                        data={territoryList}
                        save="key"
                    />
                    <Text style={styles.label}>Assigned Schools</Text>
                    <MultipleSelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                        onSelect={() => alert(selected)}
                        label="Selected Schools"
                    />
                    <View style={{ flexDirection: 'row', textAlign: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.label}>Assign Period</Text>
                        <Pressable
                            style={[styles.plusButton, styles.buttonOpen]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textPlus}>+</Text>
                        </Pressable>
                    </View>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <ScrollView style={styles.scrollView}>
                                        <View>
                                            <View style={styles.schoolList}>
                                                <SelectList
                                                    key="key"
                                                    setSelected={(val) => setAssignCal({ ...assignCal, school: val })}
                                                    data={data}
                                                    save="value"
                                                />
                                            </View>
                                            <View style={styles.container}>
                                                <Calendar
                                                    minDate={Date()}
                                                    monthFormat={"MMMM yyyy"}
                                                    markedDates={markedDates}
                                                    markingType="period"
                                                    hideExtraDays={true}
                                                    hideDayNames={true}
                                                    onDayPress={onDayPress}
                                                />
                                            </View>
                                        </View>
                                        <Pressable
                                            style={[styles.button, styles.buttonOpen]}
                                            onPress={handleCreate}>
                                            <Text style={styles.textStyle}>Create</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}>
                                            <Text style={styles.textStyle}>Don't Create !!</Text>
                                        </Pressable>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    {assignSlot.length > 0 && assignSlot.map((item) => {
                        return (
                            <View style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text>{item.school}</Text>
                                    <Text>{item.startDate} to {item.endDate}</Text>
                                </View>
                                <Pressable
                                    style={[styles.agendaButton, styles.buttonClose]}
                                    onPress={() => {
                                        setAssignSlot(assignSlot.filter((slot) => slot.startDate !== item.startDate));
                                    }}>
                                    <Text style={styles.agendaCrossBtn}>X</Text>
                                </Pressable>
                            </View>
                        );
                    })}
                    <Text style={styles.label}>Tennis Club</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setCoachData({ ...coachData, tennis_club: e })}
                        value={coachData.tennis_club}
                    />
                    <Text style={styles.label}>Favourite Pro Player</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setCoachData({ ...coachData, favorite_pro_player: e })}
                        value={coachData.favorite_pro_player}
                    />
                    <Text style={styles.label}>Handed</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setCoachData({ ...coachData, handed: e })}
                        value={coachData.handed}
                    />
                    <Text style={styles.label}>Favourite Drill</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setCoachData({ ...coachData, favorite_drill: e })}
                        value={coachData.favorite_drill}
                    />
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.btnWrapper}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
        marginTop: 60,
    },
    heading: {
        textAlign: "center",
        fontSize: 18,
        padding: 20
    },
    linearGradient: {
        flex: 1,
    },
    btnWrapper: {
        borderColor: "#fff",
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#ff8400",
        borderWidth: 3,
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "700",
        marginTop: 10,
    },
    scrollView: {
        marginHorizontal: 10
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10
    },
    label: {
        fontSize: 16,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center'
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
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    agendaCrossBtn: {
        fontSize: 15,
    },
    buttonOpen: {
        backgroundColor: '#ed7d31'
    },
    plusButton: {
        borderRadius: 50,
        elevation: 2,
        width: 30,
        height: 30,
        alignItems: 'center',
        backgroundColor: '#ed7d31'
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
    schoolList: {
        width: 225,
        marginTop: 10,
        marginBottom: 10
    }
});
