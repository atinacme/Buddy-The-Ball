import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import gallery from '../assets/gallery.png';
import user from '../assets/user.png';
import kids from '../assets/kids.jpg';

export default function CoachSchoolList({ navigation }) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("CoachParticularSchoolPhotos")}>
                <Image source={gallery} style={{ width: 40, height: 40 }} />
                <Image source={kids} style={{ width: 40, height: 40 }} />
                <Text>Yesterday</Text>
                <Text>Kiddie Academy Anderson</Text>
                <Image source={gallery} style={{ width: 40, height: 40 }} /><Text>100</Text>
                <Image source={user} style={{ width: 40, height: 40 }} /><Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CoachParticularSchoolPhotos")}>
                <Image source={gallery} style={{ width: 40, height: 40 }} />
                <Image source={kids} style={{ width: 40, height: 40 }} />
                <Text>Yesterday</Text>
                <Text>Kiddie Academy Anderson</Text>
                <Image source={gallery} style={{ width: 40, height: 40 }} /><Text>100</Text>
                <Image source={user} style={{ width: 40, height: 40 }} /><Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CoachParticularSchoolPhotos")}>
                <Image source={gallery} style={{ width: 40, height: 40 }} />
                <Image source={kids} style={{ width: 40, height: 40 }} />
                <Text>Yesterday</Text>
                <Text>Kiddie Academy Anderson</Text>
                <Image source={gallery} style={{ width: 40, height: 40 }} /><Text>100</Text>
                <Image source={user} style={{ width: 40, height: 40 }} /><Text>2</Text>
            </TouchableOpacity>
        </View>
    )
}
