import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'
import {createLogger} from 'redux-logger'

//initialize initial state (Redux)
const initialCakeState ={
    number: 10
}

const initialIceCreamState ={
    number: 20
}

//actions (Redux)
const buyCakeAction= () =>{
    return {
        type: 'BUY_CAKE',
    }
}

const buyIceCreamAction=()=>{
    return {
        type: 'BUY_ICE_CREAM'
    }
}

//Reducers (Redux)
const cakeReducer= (state=initialCakeState, action)=>{
    switch(action.type){
        case 'BUY_CAKE':
            return {
                number: state.number - 1
            }
        default:
            return state
    }
}

const iceCreamReducer= (state=initialIceCreamState, action)=>{
    switch(action.type){
        case 'BUY_ICE_CREAM':
            return {
                number: state.number - 1
            }
        default:
            return state
    }
}

//combine Reducers (Redux)

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

//Store (Redux)
const store = createStore(rootReducer, applyMiddleware(createLogger()))
const unsubscribe = store.subscribe(()=> console.log(store.getState()))

//connecting redux to redux (React-Redux)
const CakeShop = (props)=>(
    <div>
        <h2>Number of Cakes: {props.number}</h2>
        <button onClick={props.buyCake}>Buy Cake</button>
    </div>
)

const mapStateToPropsCake =(state) =>{
    return {
        number: state.cake.number
    }
}

const mapDispatchToPropsCake= (dispatch)=>{
    return {
        buyCake: ()=>dispatch(buyCakeAction())
    }
}

const CakeShopHOC= connect(mapStateToPropsCake, mapDispatchToPropsCake)(CakeShop)

const IceShop = (props)=>(
    <div>
        <h2>Number of Icecreams: {props.number}</h2>
        <button onClick={props.buyIce}>Buy Icecreams</button>
    </div>
)

const mapStateToPropsIce= (state)=>{
    return {
        number: state.iceCream.number
    }
}

const mapDispatchToPropsIce= (dispatch)=>{
    return {
        buyIce: ()=>dispatch(buyIceCreamAction())
    }
}

const IceShopHOC= connect(mapStateToPropsIce,mapDispatchToPropsIce)(IceShop)

const jsx=(
    <div>
        <Provider store={store}>
            <CakeShopHOC />
            <IceShopHOC />
        </Provider>
    </div>
)

ReactDOM.render(jsx, document.getElementById('root'))