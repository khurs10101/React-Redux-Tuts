const Redux= require('redux')
const thunkMiddleware= require('redux-thunk').default
const axios= require('axios')
const ReduxLogger = require('redux-logger')


const createStore= Redux.createStore
const applyMiddleware= Redux.applyMiddleware
const logger = ReduxLogger.createLogger()



const initialState ={
    loading: false,
    users: [],
    error: ''
}

//Actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'

const fetchUsersRequest =()=>{
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess =(users)=>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersError =(error)=>{
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

//Reducers
const reducer= (state= initialState, action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        
        case FETCH_USERS_ERROR:
            return {
                loading: false,
                users: [],
                error: 'Failure'
            }

        default:
            return state
    }
}

//creating store
const store= createStore(reducer, applyMiddleware(thunkMiddleware, logger))

//api call 

const fetchUsers= ()=>{
    return (dispatch)=>{
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
                .then(response =>{
                    const users= response.data.map(user => user.id)
                    dispatch(fetchUsersSuccess(users))
                })
                .catch(error =>{
                    dispatch(fetchUsersError(error.message))
                })
    }
}

//dispatching fetchUsers() 
store.subscribe(()=> console.log(store.getState()))
store.dispatch(fetchUsers())
