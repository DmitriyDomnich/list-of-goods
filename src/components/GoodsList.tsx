import { useCallback, useEffect, useMemo } from 'react';
import {
  selectAllGoods,
  selectGoodsError,
  selectIsDataLoading,
} from '../rdx/goods/selectors';
import { fetchGoodsThunk } from '../rdx/goods/thunks';
import { useAppDispatch, useAppSelector } from '../rdx/hooks';
import { useSearchParams } from 'react-router-dom';
import SkeletonCard from './SkeletonCard';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import GoodsListSettings from './GoodsListSettings';
import GoodsItem from './GoodsItem';

const GoodsList = () => {
  const goods = useAppSelector(selectAllGoods);
  const isDataLoading = useAppSelector(selectIsDataLoading);
  const error = useAppSelector(selectGoodsError);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const onAddItem = useCallback(() => {
    const prevSearchParams = new URLSearchParams(searchParams);
    navigate({
      pathname: 'item',
      search: prevSearchParams.toString(),
    });
  }, [navigate, searchParams]);
  const onCancelAdd = useCallback(() => {
    const prevSearchParams = new URLSearchParams(searchParams);
    prevSearchParams.delete('itemId');
    navigate({
      pathname: '/',
      search: prevSearchParams.toString(),
    });
  }, [navigate, searchParams]);

  const isAdding = useMemo(
    () => location.pathname.includes('item'),
    [location]
  );

  useEffect(() => {
    dispatch(fetchGoodsThunk());
  }, [dispatch]);
  useEffect(() => {
    const id = setTimeout(() => dispatch(fetchGoodsThunk()), 2000);
    return () => clearTimeout(id);
  }, [error, dispatch]);

  const resultGoods = useMemo(() => {
    const filterCategory = searchParams.get('filter');
    const sortCategory = searchParams.get('sort');
    const sortWay = searchParams.get('isAsc');

    const filteredGoods = filterCategory
      ? [
          ...goods.filter((good) => {
            return good.category === filterCategory;
          }),
        ]
      : [...goods];

    const sortedGoods = sortCategory
      ? sortWay === 'true'
        ? filteredGoods.sort((a: any, b: any) =>
            a[sortCategory] < b[sortCategory]! ? 1 : -1
          )
        : filteredGoods.sort((a: any, b: any) =>
            a[sortCategory] > b[sortCategory]! ? 1 : -1
          )
      : filteredGoods;

    return sortedGoods;
  }, [searchParams, goods]);

  return (
    <div className={error ? 'pointer-events-none' : undefined}>
      <div className='flex flex-wrap mb-2 items-center'>
        <Button
          onClick={isAdding ? onCancelAdd : onAddItem}
          variant='contained'
          className='w-1/2 max-w-xl min-w-[100px]'
          sx={{
            marginInline: 'auto',
          }}
        >
          {isAdding ? <CancelIcon /> : <AddIcon />}
        </Button>
        <div className='self-end'>
          <GoodsListSettings />
        </div>
      </div>
      {error && (
        <h3 className='text-red-600 flex justify-center font-bold text-center text-2xl'>
          <Alert severity='error'>{error}</Alert>
        </h3>
      )}
      <div className='flex flex-wrap'>
        {isDataLoading ? (
          <SkeletonCard length={4} />
        ) : (
          resultGoods.map((good) => (
            <div
              key={good.id}
              className='p-1 flex-grow sm:flex-grow-0 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
            >
              <GoodsItem item={good} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoodsList;
