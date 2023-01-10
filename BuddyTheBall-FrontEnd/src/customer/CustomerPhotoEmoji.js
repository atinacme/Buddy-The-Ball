
import React, { memo } from 'react';
import { SafeAreaView, FlatList, Text } from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';

function CustomerPhotoEmoji({ }) {
    return (
        <Text style={{ width: 250, height: 300, border: '2px solid black' }}>
            <EmojiSelector onEmojiSelected={emoji => { console.log(emoji); }} />
        </Text>
    );
}

export default memo(CustomerPhotoEmoji);