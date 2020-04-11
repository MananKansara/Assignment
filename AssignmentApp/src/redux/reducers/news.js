import { 
    FETCH_NEWS_SUCCESS, 
    FETCH_NEWS_FAILURE, 
    FETCHING_NEWS 
} from '../../constants/APIconstants';

const initialState = {
    news: [],
    isFetching: false,
    error: false
}

export default function newsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_NEWS:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_NEWS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                news: action.data
            }
        case FETCH_NEWS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}