import { useSearchParams } from 'react-router-dom';
import { selectGoodsItemById } from '../rdx/goods/selectors';
import { useAppSelector } from '../rdx/hooks';

export const useGoodsItem = () => {
  const [searchParams] = useSearchParams();
  const goodsItem = useAppSelector(
    selectGoodsItemById(searchParams.get('itemId'))
  );

  return goodsItem;
};
