import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

export default function CustomerPhotos({ navigation }) {
    return (
        <View>
            <Text>Kiddie Academy Anderson</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CustomerParticularPhoto")}><Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} /></TouchableOpacity>
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
        </View>
    )
}
