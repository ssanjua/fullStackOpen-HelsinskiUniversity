import { createStore, combineReducers } from 'redux';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
  notification: notificationReducer,
});

const store = createStore(rootReducer);

export default store