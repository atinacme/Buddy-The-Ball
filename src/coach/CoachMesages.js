import React from 'react'
import { SafeAreaView, Text, Image, View } from 'react-native'
import user from '../assets/user.png'
import rightArrow from '../assets/right-arrow.png'

export default function CoachMesages() {
    const messages = [
        {
            name: 'Atin Gupta',
            day: 'Wednesday',
            message: 'Today is wednesday'
        },
        {
            name: 'Sugam Mahendaru',
            day: 'Yesterday',
            message: 'Yesterday is tuesday'
        },
        {
            name: 'Bhupendra Singh',
            day: 'Monday',
            message: 'Monday is the first day'
        }
    ]
    return (
        <SafeAreaView>
            {messages.map(item => {
                return (
                    <View>
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
