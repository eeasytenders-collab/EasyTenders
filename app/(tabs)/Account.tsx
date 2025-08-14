import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Account = () => {
    return (
        <SafeAreaView>
            <View>
                <Text className='text-lg font-bold text-center mt-4'>Account</Text>
            </View>
        </SafeAreaView>
    )
}

export default Account