import { GoodsItem } from '../../models/GoodsItem';
import { RootState } from '../store';

export const selectAllGoods = (state: RootState): GoodsItem[] =>
  state.goods.data;
export const selectIsDataLoading = (state: RootState) =>
  state.goods.isDataLoading;
export const selectIsDataAdding = (state: RootState) =>
  state.goods.isDataAdding;
export const selectGoodsError = (state: RootState) => state.goods.error;
export const selectGoodsItemById =
  (itemId: string | null) => (state: RootState) =>
    itemId
      ? (state.goods.data as GoodsItem[]).find(
          (good: GoodsItem) => good.id === itemId
        )
      : null;
export const selectRemovingItemId = (state: RootState): string | null =>
  state.goods.removingItemId;
