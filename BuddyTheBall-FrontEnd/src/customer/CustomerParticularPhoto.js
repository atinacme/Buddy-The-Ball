import React from 'react';
import { Text, View, Image, TextInput, StyleSheet } from 'react-native';
import smiley from '../assets/smiley.png';
import message from '../assets/message.png';
import heart from '../assets/red-heart.png';
import clapping from '../assets/clappingHand.png';
import profile from '../assets/profile.png';

export default function CustomerParticularPhoto({ navigation, route }) {
    return (
        <View style={styles.imgWrap}>
            <Image source={{ uri: route.params.photo.url }} style={{ width: 400, height: '100%' }} />
            <View style={styles.imgDes}>
                <Text style={styles.DateName}>
                    <Image source={profile} style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#fff' }} />
                    <Text style={styles.icontxt}>Ayan</Text>{"\n"}
                    <Text style={styles.date}>September 26 6:26 P.M</Text>
                    <Image source={clapping} style={{ width: 40, height: 40 }} />
                </Text>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeText}
                    // value={text}
                    placeholder="Add a comment..."
                />
                <View style={styles.iconWrapper}>
                    <View style={styles.iconWrap}>
                        <Image source={smiley} style={{ width: 40, height: 40 }} />
                        <Text style={styles.icontxt}>+</Text>
                    </View>
                    <View style={styles.iconWrap}>
                        <Image source={heart} style={{ width: 40, height: 40 }} />
                        <Text style={styles.icontxt}>1</Text>
                    </View>
                    <View style={styles.iconWrap}>
                        <Image source={message} style={{ width: 40, height: 40 }} />
                        <Text style={styles.icontxt}>1</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    imgWrap: {
        position: 'relative'
    },
    DateName: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    imgDes: {
        position: 'absolute',
        bottom: 0,
        left: 30
    },

    input: {
        width: 300,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        marginTop: 10,
        color: '#fff',
        padding: 10,
        backgroundColor: '#302f35',
        fontFamily: 'LemonJuice'
    },
    iconWrap: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#302f35',
        marginBottom: 10,
        width: 90,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'space-between',
        borderRadius: 20,
    },
    icontxt: {
        color: '#fff',
        fontFamily: 'LemonJuice'
    },
    iconWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    date: {
        color: '#fff',
        textAlign: 'right',
        float: 'right',
        fontFamily: 'LemonJuice'
    }
});