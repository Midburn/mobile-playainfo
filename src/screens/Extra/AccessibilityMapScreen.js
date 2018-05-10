import React from 'react';
import {Dimensions, Platform, BackHandler} from 'react-native';
import {View} from 'react-native-ui-lib'
import Pdf from 'react-native-pdf';

const AccessibilityMap = require('../../../data/2018/map/CityMap2018Accessibility.pdf');


export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        setTimeout(() => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                this.props.navigator.pop();
                return true;
            });
        }, 500);
    }

    render() {
        return (
            <View flex center>
                <Pdf
                    source={AccessibilityMap}
                    style={{flex: 1, width: Dimensions.get('window').width}}
                />
            </View>
        )
    }
}