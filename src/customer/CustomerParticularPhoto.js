import React from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import smiley from '../assets/smiley.png';
import message from '../assets/message.png';
import heart from '../assets/red-heart.png';

export default function CustomerParticularPhoto() {
    return (
        <View>
            <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
            <View>
                <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 40, height: 40 }} />
                <Text>Ayan</Text>
            </View>
            <TextInput
                // style={styles.input}
                // onChangeText={onChangeText}
                // value={text}
                placeholder="Add a comment..."
            />
            <View>
                <Image source={smiley} style={{ width: 40, height: 40 }} />
                <Text>+</Text>
            </View>
            <View>
                <Image source={heart} style={{ width: 40, height: 40 }} />
                <Text>1</Text>
            </View>
            <View>
                <Image source={message} style={{ width: 40, height: 40 }} />
                <Text>1</Text>
            </View>
        </View>
    )
}
