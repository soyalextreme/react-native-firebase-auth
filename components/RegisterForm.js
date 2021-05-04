import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { validateEmail } from '../utils/validation';
import firebase from "../db/firebase";

export default function RegisterForm(props) {

    const { changeForm } = props;

    const [formdata, setFormdata] = useState(defaultValue());
    const [formerror, setFormerror] = useState({})

    const register = () => {
        // campos vacios
        let errors = {}; 

        if(!formdata.email || !formdata.password || !formdata.confirmationPassword){
            if(!formdata.email) errors.email = true;
            if(!formdata.password) errors.password = true;
            if(!formdata.confirmationPassword) errors.confirmationPassword = true;
        }else if(!validateEmail(formdata.email)){
            errors.email = true
        }else if(formdata.password !== formdata.confirmationPassword){
            errors.password = true;
            errors.confirmationPassword = true;
        }else if(formdata.password.length < 6){
            errors.password = true;
        }else {
            console.log("datos correctos");
            firebase
            .auth()
            .createUserWithEmailAndPassword(formdata.email, formdata.password)
            .then( () => console.log("user register") )
            .catch( error => {
                setFormerror({
                    email: true,
                    password: true,
                    confirmationPassword: true
                });
                console.log(error);
            } )
        }
        setFormerror(errors);
        console.log(formdata);
    }

    function defaultValue() {
        return {
            email: "",
            password: "",
            confirmationPassword: "",
        };
    }

    return (
        <>
            <TextInput
                style={[styles.input, formerror.email && styles.login__error]}
                placeholder="Correo electrónico"
                placeholderTextColor='#969696'
                onChangeText={(text) => setFormdata({...formdata, email: text})}
            />
            <TextInput
                style={[styles.input, formerror.password && styles.login__error]}
                placeholder="Contraseña"
                placeholderTextColor='#969696'
                secureTextEntry={true}
                onChangeText={(text) => setFormdata({...formdata, password: text})}
            />
            <TextInput
                style={[styles.input, formerror.confirmationPassword && styles.login__error]}
                placeholder="Repetir Contraseña"
                placeholderTextColor='#969696'
                secureTextEntry={true}
                onChangeText={(text) => setFormdata({...formdata, confirmationPassword: text})}
            />
            <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>
            <View style={styles.login__button}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 18
    },
    input: {
        height: 50,
        color: "#fff",
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040'
    },
    login__button: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    login__error: {
        borderColor: "#940c0c",
    }
})
