import { GoodsItem } from '../../models/GoodsItem';

export const GET_GOODS_LIST_REQUEST = 'GET_GOODS_LIST_REQUEST';
export const GET_GOODS_LIST_SUCCESS = 'GET_GOODS_LIST_SUCCESS';
export const GET_GOODS_LIST_FAILED = 'GET_GOODS_LIST_FAILED';

export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_LIST_REQUEST';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_LIST_SUCCESS';
export const CREATE_ITEM_FAILED = 'CREATE_ITEM_LIST_FAILED';

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_LIST_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_LIST_SUCCESS';
export const UPDATE_ITEM_FAILED = 'UPDATE_ITEM_LIST_FAILED';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_LIST_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_LIST_SUCCESS';
export const REMOVE_ITEM_FAILED = 'REMOVE_ITEM_LIST_FAILED';

export const removeItemFailed = (error: string) => ({
  type: REMOVE_ITEM_FAILED,
  error,
});

export const removeItemRequest = (id: string) => ({
  type: REMOVE_ITEM_REQUEST,
  id,
});

export const removeItemSuccess = (itemId: string) => ({
  type: REMOVE_ITEM_SUCCESS,
  itemId,
});

export const updateItemFailed = (error: string) => ({
  type: UPDATE_ITEM_FAILED,
  error,
});

export const updateItemRequest = () => ({
  type: UPDATE_ITEM_REQUEST,
});

export const updateItemSuccess = (item: GoodsItem) => ({
  type: UPDATE_ITEM_SUCCESS,
  item,
});

export const createItemFailed = (error: string) => ({
  type: CREATE_ITEM_FAILED,
  error,
});

export const createItemRequest = () => ({
  type: CREATE_ITEM_REQUEST,
});

export const createItemSuccess = (item: GoodsItem) => ({
  type: CREATE_ITEM_SUCCESS,
  item,
});

export const getGoodsListFailed = (error: string) => ({
  type: GET_GOODS_LIST_FAILED,
  error,
});

export const getGoodsListRequest = () => ({
  type: GET_GOODS_LIST_REQUEST,
});

export const getGoodsListSuccess = (list: GoodsItem[]) => ({
  type: GET_GOODS_LIST_SUCCESS,
  list,
});
