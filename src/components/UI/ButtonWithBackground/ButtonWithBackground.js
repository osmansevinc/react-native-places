import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback,Text,View, StyleSheet, Platform} from 'react-native';

const buttonWithBackground = (props) => {

    const content =(
        <View style={[styles.button,{backgroundColor:props.color}, props.disabled ? styles.disabled : null]}>
            <Text>{props.children}</Text>
        </View>
        );

        if(props.disabled){
            return content;
        }

        if(Platform.OS === 'android'){
            return(
                <TouchableNativeFeedback onPress={props.onPress}>
                    {content}
                </TouchableNativeFeedback>
            );
        }else{
            return(
                <TouchableOpacity onPress={props.onPress}>
                    {content}
                </TouchableOpacity>
            );
        }

};



const styles = StyleSheet.create({
    button:{
        padding:10,
        margin:5,
        borderRadius:10,
        borderWidth:1,
        borderColor:'black'
    },
    disabled:{
        backgroundColor:'#eee',
        color:'#aaa',
        borderColor:'#aaa'
    }

});


export default  buttonWithBackground;