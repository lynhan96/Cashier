import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { markHydrationCompleted } from 'ducks/hydration'
import reducers from 'ducks/index'
import { reducer as formReducer } from 'redux-form'
import { autoRehydrate, persistStore } from 'redux-persist'
import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

const middleware = [ thunk ]
var applyMiddlewareConfig

if (__DEV__) {
  Reactotron.configure({ name: 'Restaurant' })
    .use(reactotronRedux())
    .connect()

  // Clear Reactotron of previous loggings
  Reactotron.clear()

  applyMiddlewareConfig = compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
} else {
  applyMiddlewareConfig = compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
}

const initialState = {}
const rootReducers = combineReducers({...reducers, form: formReducer})
const create = __DEV__ ? Reactotron.createStore : createStore
const Store = create(rootReducers, initialState, applyMiddlewareConfig)

// Initialise the state
const { dispatch } = Store

// Persist redux store in local storage
persistStore(
  Store,
  { blacklist: ['hydration'] },
  () => dispatch(markHydrationCompleted())
)

export default Store
