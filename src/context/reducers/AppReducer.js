import {LOADING,SET_USER_ID} from '../actions/AppActions'

export default function(state,action){
    switch(action.type){
        case LOADING:
            return{
                ...state,
                isLoading: true
            };
        case SET_USER_ID:
            return{
                ...state,
                userId: action.userInfo.id
            };
        default:
            return{
                ...state
            };
    }
}