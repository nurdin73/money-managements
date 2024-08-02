import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const store = createStore(reducers, applyMiddleware(...middlewares))

sagaMiddleware.run(sagas)

export default store
