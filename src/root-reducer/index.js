import { combineReducers } from 'redux';

const appReducers = combineReducers({
});

const rootReducer = (state, action) => appReducers(state, action);

export default rootReducer;
