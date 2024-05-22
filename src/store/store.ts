import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer'; // Importa tu reducer de usuario

const rootReducer = combineReducers({
  user: userReducer,
  // Otros reducers...
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
