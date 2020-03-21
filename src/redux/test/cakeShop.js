import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider, connect } from 'react-redux'


//initlize State (Redux)
const initialCakeState={
    numOfCakes: 10
}

//initialize action creator (Redux)

const buyCakeAction =() =>{
    return {
        type: 'BUY_CAKE'
    }
}

//reducer (Redux)
const cakeReducer= (state=initialCakeState, action) =>{
    switch (action.type){
        case 'BUY_CAKE':
            return {
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

//creating store (Redux)
const store = createStore(cakeReducer, applyMiddleware(createLogger()))
const unsubscribe= store.subscribe(()=> console.log(store.getState()))


// connecting redux store to cake shop (React-Redux)
const CakeShop= (props)=>(
    <div>
        <h2>Number of Cakes: {props.numOfCakes}</h2>
        <button onClick={props.buyCake}>Buy Cake</button>
    </div>
)

const mapStateToProps = (state, ownProps)=>{
    return {
        numOfCakes: state.numOfCakes
    }
}

const mapDispatchToProps= (dispatch, ownProps)=>{
    return {
        buyCake: ()=>dispatch(buyCakeAction())
    }
}

const CakeShopHOC= connect(mapStateToProps, mapDispatchToProps)(CakeShop)


const jsx=(
    <div>
        <Provider store={store}>
            <CakeShopHOC />
        </Provider>
    </div>
)

ReactDOM.render(jsx,document.getElementById('root'))