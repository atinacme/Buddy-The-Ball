import React from 'react'
import { SafeAreaView, Text, Image, View } from 'react-native'
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
                    <View key={item.id}>
                        <Image source={user} style={{ width: 40, height: 40 }} />
                        <Text>{item.name}</Text>
                        <Text>{item.day}</Text>
                        <Image source={rightArrow} style={{ width: 40, height: 40 }} />
                        <Text>{item.message}</Text>
                    </View>
                )
            })}
        </SafeAreaView>
    )
}
