import { AnyAction } from 'redux';
import { GoodsItem } from '../../models/GoodsItem';
import {
  GET_GOODS_LIST_REQUEST,
  GET_GOODS_LIST_SUCCESS,
  GET_GOODS_LIST_FAILED,
  CREATE_ITEM_FAILED,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_REQUEST,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAILED,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
} from './actions';

type GoodsState = {
  data: GoodsItem[];
  isDataLoading: boolean;
  isDataAdding: boolean;
  removingItemId: null | string;
  error: string | null;
};

const initialState: GoodsState = {
  data: [],
  isDataLoading: false,
  isDataAdding: false,
  removingItemId: null,
  error: null,
};

export const goodsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CREATE_ITEM_REQUEST:
      return {
        ...state,
        error: null,
        isDataAdding: true,
      };
    case CREATE_ITEM_SUCCESS:
      return {
        ...state,
        isDataAdding: false,
        data: [...state.data, action.item],
      };
    case CREATE_ITEM_FAILED:
      return {
        ...state,
        isDataAdding: false,
        error: action.error,
      };
    case GET_GOODS_LIST_FAILED:
      return {
        ...state,
        data: [],
        error: action.error,
        isDataLoading: false,
      };
    case GET_GOODS_LIST_REQUEST:
      return {
        ...state,
        error: null,
        isDataLoading: true,
      };
    case GET_GOODS_LIST_SUCCESS:
      return {
        ...state,
        data: action.list,
        isDataLoading: false,
      };
    case REMOVE_ITEM_REQUEST:
      return {
        ...state,
        error: null,
        removingItemId: action.id,
      };
    case REMOVE_ITEM_SUCCESS: {
      const newList = [...state.data];
      const index = newList.findIndex((good) => good.id === action.itemId);
      newList.splice(index, 1);

      return {
        ...state,
        removingItemId: null,
        data: newList,
      };
    }
    case REMOVE_ITEM_FAILED:
      return {
        ...state,
        removingItemId: null,
        error: action.error,
      };
    case UPDATE_ITEM_REQUEST:
      return {
        ...state,
        error: null,
        isDataAdding: true,
      };
    case UPDATE_ITEM_SUCCESS: {
      const newList = [...state.data];
      const index = newList.findIndex((good) => good.id === action.item.id);
      newList[index] = action.item;

      return {
        ...state,
        isDataAdding: false,
        data: newList,
      };
    }
    case UPDATE_ITEM_FAILED:
      return {
        ...state,
        isDataAdding: false,
        error: action.error,
      };
    default:
      return state;
  }
};
