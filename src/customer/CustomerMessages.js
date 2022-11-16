import React from 'react'
import { SafeAreaView, Text, Image, View, StyleSheet } from 'react-native'
import user from '../assets/user.png'
import rightArrow from '../assets/right-arrow.png'

export default function CustomerMessages() {
    const messages = [
        {
            id: 1,
            name: 'Atin Gupta',
            day: 'Wednesday',
            message: 'Today is wednesday'
        },
        {
            id: 2,
            name: 'Sugam Mahendaru',
            day: 'Yesterday',
            message: 'Yesterday is tuesday'
        },
        {
            id: 3,
            name: 'Bhupendra Singh',
            day: 'Monday',
            message: 'Monday is the first day'
        }
    ]
    return (
        <SafeAreaView>
            {messages.map(item => {
                return (
                    <View key={item.id} style={styles.messagewrap}>
                        <Image source={user} style={{ width: 30, height: 30 }} />
                        {/* <Text style={styles.nameDay}> */}
                            <Text style={styles.msgName}>{item.name}</Text>
                            <Text style={styles.rightsec}>
                                <Text style={styles.msgDay}>{item.day}</Text>
                                <Image source={rightArrow} style={{ width: 15, height: 15  }} />
                            </Text>
                        {/* </Text> */}
                        <Text style={styles.msgWrap}>{item.message}</Text>
                    </View>
                )
            })}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    messagewrap: {
        display: 'flex',  
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    msgWrap: {
        paddingLeft: 55,
        paddingTop: 0,
        marginTop: 0
    },
    msgName: {
        textAlign: 'left',
        color: '#000'
    },
    msgDay: {
        textAlign: 'right',
       color: '#000',
       marginRight: 10
    }
});