const Redux = require('redux')
const ReduxLogger = require('redux-logger')



const createStore = Redux.createStore
const combineReducers= Redux.combineReducers
const applyMiddleware= Redux.applyMiddleware
const logger = ReduxLogger.createLogger()


const BUY_CAKE= 'BUY_CAKE'
const BUY_ICECREAM= 'BUY_ICECREAM'

//action
const buyCake=()=>{
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
}

const buyIcecream= ()=>{
    return {
        type: BUY_ICECREAM,
        info: 'Icecream bought'
    }
}

//initial states
const initialCakeState = {
    numOfCakes: 10
}

const initialIcecreamState = {
    numOfIcecreams: 20
}

//Reducers

const cakeReducer =(state= initialCakeState, action)=>{
    switch(action.type){
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

const iceCreamReducer= (state= initialIcecreamState, action)=>{
    switch(action.type){
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams - 1
            }
        default:
            return state
    }
}

//combining reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

//store 
const store = createStore(rootReducer, applyMiddleware(logger))
console.log("Initial State: ", store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()

