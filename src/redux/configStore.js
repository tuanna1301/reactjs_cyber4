import { applyMiddleware, combineReducers, createStore } from "redux";
import TodoListReducer from './reducer/TodoListReducer'
import reduxThunk from 'redux-thunk'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from "./sagas/rootSaga";
import LoadingReducer from "./reducer/LoadingReducer";
import ModalReducer from "./reducer/ModalReducer";
const middleWareSaga = createMiddleWareSaga();



const rootReducer = combineReducers({
    //khai báo các reducer
    TodoListReducer,
    LoadingReducer,
    ModalReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga))
middleWareSaga.run(rootSaga)

export default store;