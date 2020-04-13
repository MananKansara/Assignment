import React, { Component } from "react";
import { View, Dimensions, Text } from 'react-native';
import Modal from "react-native-modal";

const window = Dimensions.get('window');

export default class NewsDataModel extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal isVisible={this.props.isNewsVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={this.props.requestClose}
                onBackdropPress={this.props.requestClose}
                backdropColor={'black'}
                backdropOpacity={0.5}
                animationInTiming={500}
                animationOutTiming={500}>
                <View style={{
                    backgroundColor: 'white',
                    width: window.width,
                    padding: 10
                }}>
                    <Text >
                        {this.props.item}
                    </Text>
                </View>
            </Modal>
        )
    }
}