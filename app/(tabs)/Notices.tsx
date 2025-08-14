import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Notices = () => {
    return (
        <SafeAreaView>
            <View>
                <Text className='text-lg font-bold text-center mt-4'>Notices</Text>
            </View>
        </SafeAreaView>
    )
}

export default Notices