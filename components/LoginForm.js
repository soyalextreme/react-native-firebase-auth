import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function LoginForm(props) {
    const { changeForm } = props;

    return (
        <View>
            <Text>LoginForm</Text>

            <TouchableOpacity onPress={changeForm}>
                <Text style={styles.btnText}>Regístrate</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 18
    }
})
