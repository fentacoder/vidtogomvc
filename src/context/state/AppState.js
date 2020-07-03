import React, {createContext,useReducer} from 'react'
import axios from 'axios'
import AppReducer from '../reducers/AppReducer'
import {LOADING,SET_USER_ID} from '../actions/AppActions'

const initialState = {
    userId: '',
    isLoading: false,
    token: '',
    name: '',
    email: ''
}

export const AppContext = createContext(initialState);

export const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer,initialState);
    const options = {
        headers: {'Content-Type': 'application/json'}
    };

    const registerUser = userObj => {
        dispatch({type: LOADING});
        axios.post('api/v1/users/register',userObj,options)
            .then(res => {
                dispatch({type: SET_USER_ID,userInfo: res.data});
            })
            .catch(err => console.log(err));
    }

    const loginUser = userObj => {
        dispatch({type: LOADING});
        axios.post('api/v1/users/login',userObj,options)
            .then(res => {
                dispatch({type: SET_USER_ID,userInfo: res.data});
            })
            .catch(err => console.log(err));
    }

    const updateUser = userObj => {
        axios.post('api/v1/users/login',userObj,options)
            .then(res => {
                console.log('success');
            })
            .catch(err => console.log(err));
    }

    return (<AppContext.Provider value={{...state,registerUser,loginUser,updateUser}}>
        {children}
    </AppContext.Provider>);
}

export const AppConsumer = AppContext.Consumer;