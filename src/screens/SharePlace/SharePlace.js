import React, { Component } from 'react';
import { View, Text, TextInput, Button,StyleSheet, ScrollView,Image} from 'react-native';
import { connect } from 'react-redux';
import {Navigation} from 'react-native-navigation';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";

import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";


class SharePlaceScreen extends Component {

    state = {
        placeName: ""
    };

    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
    };

    placeAddedHandler = () => {
        if(this.state.placeName.trim() !== ''){
            this.props.onAddPlace(this.state.placeName);
        }
    }

    placeNameChangedHandler = val =>{
            this.setState(
                {
                    placeName:val
                }
            )
    };

    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>
                            Share a Place with us!
                        </HeadingText>
                    </MainText>
                    <PickImage/>
                    <PickLocation/>
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button title="Share the Place" onPress={this.placeAddedHandler}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

/*<PlaceInput onPlaceAdded={this.placeAddedHandler}/>*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null,mapDispatchToProps)(SharePlaceScreen);