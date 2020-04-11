import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNewsList } from '../redux/action/NewsListData';
import NewsData from './NewsData';

class NewsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageNo: 0,
            timer: null
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
        console.log("Tick")

        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            this.getNewsList()
        });
    }


    getNewsList() {
        this.props.fetchNewsList(this.state.pageNo)
    }

    renderItem = (item) => {
        return (
            <NewsData data={item}></NewsData>
        )
    }

    render() {
        console.log("Response:" + JSON.stringify(this.props.newsData))
        switch (this.props.newsData.isFetching) {
            case true:
                break;
            case false:
                return(
                    <FlatList ></FlatList>
                )
        }
        return (
            <View style={styles.viewParent}>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        newsData: state.news
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchNewsList }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)

const styles = StyleSheet.create({
    viewParent: {
        flex: 1,
        backgroundColor: 'yellow'
    }
})