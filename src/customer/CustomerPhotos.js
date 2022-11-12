import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'

export default function CustomerPhotos({ navigation }) {
    return (
        <View>
            <Text  style={styles.label}>Kiddie Academy Anderson</Text>
         <Text style={styles.imgWrap}>  
          <TouchableOpacity onPress={() => navigation.navigate("CustomerParticularPhoto")}>
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }} /></TouchableOpacity>
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }}  />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }}  />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }}  />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }}  />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }}  />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }}  />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }} />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }}  />
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: '50', height: '200' }}  />
        </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        color: '#000',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    imgWrap: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
});