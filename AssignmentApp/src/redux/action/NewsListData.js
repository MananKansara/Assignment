import { FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE, FETCHING_NEWS } from '../../constants/APIconstants';
import axios from 'axios';

export function fetchNewsList(pageNo) {
    return (dispatch) => {
        dispatch(getNewsList())

        axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=' + pageNo)
            .then(response => {
                // console.log("Response:" + JSON.stringify(response.data.hits))
                return (dispatch(getNewsSuccess(response.data.hits)))
            })
            .catch(err => dispatch(getNewsFailure(err)))
    }
}

function getNewsList() {
    return {
        type: FETCHING_NEWS
    }
}

function getNewsSuccess(data) {
    return {
        type: FETCH_NEWS_SUCCESS,
        data
    }
}

function getNewsFailure(error) {
    return {
        type: FETCH_NEWS_FAILURE
    }
}