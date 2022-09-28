import { combineReducers } from 'redux';
import { goodsReducer } from './goods/reducer';

export const rootReducer = combineReducers({
  goods: goodsReducer,
});
