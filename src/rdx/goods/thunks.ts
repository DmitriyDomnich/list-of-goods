import { GoodsItem } from '../../models/GoodsItem';
import { RootState } from '../store';
import {
  createItemFailed,
  createItemRequest,
  createItemSuccess,
  getGoodsListFailed,
  getGoodsListRequest,
  getGoodsListSuccess,
  removeItemFailed,
  removeItemRequest,
  removeItemSuccess,
  updateItemFailed,
  updateItemRequest,
  updateItemSuccess,
} from './actions';
import GoodsService from '../../services/goodsService';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ErrorResponse, DataResponse } from '../../models/responses/responses';

type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const fetchGoodsThunk = (): AppThunk => {
  return async (dispatch) => {
    dispatch(getGoodsListRequest());

    const response = await GoodsService.getGoods();
    if (response.ok) {
      dispatch(
        getGoodsListSuccess((response as DataResponse<GoodsItem>).data.goods)
      );
    } else {
      dispatch(getGoodsListFailed((response as ErrorResponse).error));
    }
  };
};

export const createGoodsItemThunk = (item: GoodsItem): AppThunk => {
  return async (dispatch) => {
    dispatch(createItemRequest());

    const response = await GoodsService.createGoodsItem(item);

    if (response.ok) {
      dispatch(createItemSuccess(response.data));
    } else {
      dispatch(createItemFailed((response as ErrorResponse).error));
    }
  };
};

export const removeGoodsItemThunk = (itemId: string): AppThunk => {
  return async (dispatch) => {
    dispatch(removeItemRequest(itemId));

    const response = await GoodsService.removeGoodsItem(itemId);
    if (response.ok) {
      dispatch(removeItemSuccess(itemId));
    } else {
      dispatch(removeItemFailed((response as ErrorResponse).error));
    }
  };
};

export const updateGoodsItemThunk = (item: GoodsItem): AppThunk => {
  return async (dispatch) => {
    dispatch(updateItemRequest());

    const response = await GoodsService.updateGoodsItem(item);
    if (response.ok) {
      dispatch(updateItemSuccess(item));
    } else {
      dispatch(updateItemFailed((response as ErrorResponse).error));
    }
  };
};
