import React,{Component} from 'react';
import { View, Image, Text, Button, StyleSheet,TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import Iconss from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component{

    placeDeletedHandler = () =>{
        this.props.onDeletePlace(this.props.selectedPlace.key);
        Navigation.pop(this.props.componentId);
    };

    render(){
        return(
            <View style={styles.container}>
                <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={styles.deleteButton}>
                            <Iconss size={30} name="ios-trash" color="red"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        );
    };
} ;

const styles = StyleSheet.create({
   container: {
       margin:22
   },
    placeImage:{
       width:'100%',
        height:200
    },
    placeName:{
       fontWeight:'bold',
        textAlign:'center',
        fontSize:28
    },
    deleteButton:{
       alignItems:"center"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};

export default  connect(null,mapDispatchToProps)(PlaceDetail);