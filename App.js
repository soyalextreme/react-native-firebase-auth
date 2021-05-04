import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Auth from './components/Auth';
import firebase from './db/firebase';
import 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
      //console.log("Usuario logeado:", response)
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      {user ? <Logout/> : <Auth />}
    </View>
  );
}


function Logout() {
  const logoutNow = () => {
    firebase.auth().signOut();
  }

  return (
    <View>
      <Text>Estas loggeado</Text>
      <Button title="cerrar sesion" onPress={logoutNow}/>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
