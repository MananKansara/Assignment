import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNewsList } from '../redux/action/NewsListData';
import NewsModel from './NewsDataModel';

class NewsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageNo: 0,
            timer: null,
            itemModel: "",
            isItemVisible: false
        }
    }

    componentDidMount() {
        this.getNewsList(this.state.pageNo)

        let timer = setInterval(this.tick, 10000);
        this.setState({ timer });
    }

    componentWillUnmount() {
        this.clearInterval(this.state.timer);
    }

    tick = () => {
        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            this.getNewsList()
        });
    }

    getNewsList() {
        this.props.fetchNewsList(this.state.pageNo)
    }

    onItemPress = (item) => {
        this.setState({
            itemModel: JSON.stringify(item),
            isItemVisible: true
        })
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.viewItem}
                onPress={() => this.onItemPress(item)}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>Title: </Text>
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderSeparator = () => (
        <View style={{
            backgroundColor: 'black',
            height: 0.6
        }} />
    );

    requestClose = () => {
        this.setState({
            isNewsVisible: false
        })
    }

    render() {
        switch (this.props.isFetching) {
            case true:
                return <View style={styles.viewLoader}>
                    <ActivityIndicator size={'large'} />
                </View>
            case false:
                return (
                    <View style={styles.viewParent}>
                        <NewsModel isNewsVisible={this.state.isItemVisible}
                            requestClose={this.requestClose}
                            item={this.state.itemModel}>
                        </NewsModel>

                        <FlatList
                            keyExtractor={(item, index) => item.created_at}
                            data={this.props.news}
                            renderItem={(index) => this.renderItem(index)}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                    </View>
                )
        }
    }
}

function mapStateToProps(state) {
    const { isFetching, news } = state.news
    return {
        isFetching, news
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchNewsList }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)

const styles = StyleSheet.create({
    viewLoader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewItem: {
        paddingHorizontal: 5,
        paddingVertical: 10
    }
})