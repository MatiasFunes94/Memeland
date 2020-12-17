import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import errorReducer from './ErrorReducer/Reducer';
import userReducer from './UserReducer/Reducer';
import postReducer from './PostReducer/Reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  errorReducer,
  userReducer,
  postReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
