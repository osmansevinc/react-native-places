import React,{Component} from 'react';
import {  View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import MapView from "react-native-maps";
import Iconss from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';
import PickLocation from "../../components/PickLocation/PickLocation";

class PlaceDetail extends Component{


    state = {
        viewMode: "portrait"
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
        Navigation.events().bindComponent(this);
    }

    componentWillMount(){

        Promise.all([
            Iconss.getImageSource('md-return-left',30)
        ]).then(sources => {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    rightButtons: [
                        {
                            id: 'returnButton',
                            icon: sources[0]
                        }
                    ]
                }
            });
        })
    }

    navigationButtonPressed({ returnButton }) {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: []
            }
        });
        Navigation.pop(this.props.componentId);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    placeDeletedHandler = () =>{
        this.props.onDeletePlace(this.props.selectedPlace.key);
        Navigation.pop(this.props.componentId);
    };

    render(){
        return (
            <View
                style={[
                    styles.container,
                    this.state.viewMode === "portrait"
                        ? styles.portraitContainer
                        : styles.landscapeContainer
                ]}
            >
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image
                            source={this.props.selectedPlace.image}
                            style={styles.placeImage}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <MapView
                            initialRegion={{
                                ...this.props.selectedPlace.location,
                                latitudeDelta: 0.0122,
                                longitudeDelta:
                                Dimensions.get("window").width /
                                Dimensions.get("window").height *
                                0.0122
                            }}
                            style={styles.map}
                        >
                            <MapView.Marker coordinate={this.props.selectedPlace.location} />
                        </MapView>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>
                            {this.props.selectedPlace.name}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Iconss
                                    size={30}
                                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                                    color="red"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
} ;

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    placeDetailContainer: {
        flex: 2
    },
    placeImage: {
        width: "100%",
        height: "100%"
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    deleteButton: {
        alignItems: "center"
    },
    subContainer: {
        flex: 1
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
};

export default  connect(null,mapDispatchToProps)(PlaceDetail);