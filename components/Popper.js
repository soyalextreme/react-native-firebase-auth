import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native"

const Popper = ({text}) => {

    const [ hide, setHide ] = React.useState(false);


    const hideItem = () => {
        setHide(true);
    }

    return (
        <TouchableOpacity style={[ss.popper__container, hide && ss.popper__hidden]} onLongPress={hideItem}>
            <Text style={[ss.popper__text, hide && ss.popper__hidden]}>{text}</Text>
        </TouchableOpacity>
      );
}

const ss = StyleSheet.create({
    popper__container: {
        position: "absolute",
        backgroundColor: "red",
        top: -200,
        padding: 20,
    },
    popper__text: {
        color: "white",
        fontSize: 15,
    },
    popper__hidden: {
       display: "none",
    }
})


export default Popper;

