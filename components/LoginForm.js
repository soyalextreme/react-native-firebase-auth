import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { validateEmail } from '../utils/validation';
import firebase from "../db/firebase"
import Popper from './Popper';

export default function LoginForm(props) {
    const { changeForm } = props;

    const [formdata, setFormdata] = useState({ email: "", password: "" })
    const [formerror, setFormerror] = useState({})

    const login = () => {
        if (!formdata.email || !validateEmail(formdata.email)) {
            setFormerror({...formerror, email: true})
        } else if (!formdata.password) {
            setFormerror({...formerror, password: true})
        } else {
            firebase.auth()
            .signInWithEmailAndPassword(formdata.email, formdata.password)
            .then(() => console.log("iniciando sesion"))
            .catch((error) => {
                                setFormerror({...formerror, credentials: true });
                                setTimeout(() => setFormerror({...formerror, credentials: false}), 3000);
                            });
        }
    }

    return (
        <View style={styles.page}>
            {formerror.credentials && <Popper text="Ocurrio un error con tus credenciales."/>}
            <View style={styles.login__container}>
                <Text style={styles.login__title}>Iniciar Sesion</Text>
                <View style={styles.form__container}>
                    <TextInput
                        style={[styles.input, formerror.email && styles.login__error]}
                        placeholder="Correo electrónico"
                        placeholderTextColor='#969696'
                        onChangeText={(text) => setFormdata({ ...formdata, email: text.trim() })}
                    />
                    <TextInput
                        style={[styles.input, formerror.email && styles.login__error]}
                        placeholder="Password"
                        placeholderTextColor='#969696'
                        onChangeText={(text) => setFormdata({ ...formdata, password: text })}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={login} style={styles.btn}>
                    <Text style={styles.btnText}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={changeForm}>
                <Text style={styles.btnText}>Aun no tengo cuenta, Regístrate</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    login__container: {
        backgroundColor: "black",
        width: "80%",
        alignItems: "center",
        borderRadius: 30,
        marginBottom: 35,

    },
    btnText: {
        color: '#fff',
        fontSize: 18
    },
    input: {
        height: 50,
        color: "#fff",
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
    },
    login__error: {
        borderColor: "#940c0c",
    },
    form__container: {

    },
    login__title: {
        color: "white",
        marginVertical: 20,
        fontSize: 20,
    },
    btn: {
        backgroundColor: "tomato",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: "flex-end",
    },
    page: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    }
})
