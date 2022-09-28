import React, { useCallback, useMemo } from 'react';
import { GoodsItem as GoodsItemModel } from '../models/GoodsItem';
import { Card, CardActions, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../rdx/hooks';
import { removeGoodsItemThunk } from '../rdx/goods/thunks';
import { selectRemovingItemId } from '../rdx/goods/selectors';
import SkeletonCard from './SkeletonCard';
import { useSearchParams } from 'react-router-dom';

type Props = {
  item: GoodsItemModel;
};

const GoodsItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const removingItemId = useAppSelector(selectRemovingItemId);

  const onEditItem = useCallback(() => {
    const editSearchParams = new URLSearchParams(searchParams);
    editSearchParams.set('itemId', item.id);
    navigate({
      pathname: 'item',
      search: editSearchParams.toString(),
    });
  }, [navigate, item.id, searchParams]);
  const onDeleteItem = useCallback(() => {
    if (searchParams.get('itemId') === item.id) {
      navigate('/');
    }
    dispatch(removeGoodsItemThunk(item.id));
  }, [dispatch, item.id, searchParams, navigate]);

  const isDeleting = useMemo(() => {
    return Boolean(removingItemId && removingItemId === item.id);
  }, [removingItemId, item.id]);

  return (
    <>
      {isDeleting ? (
        <SkeletonCard length={1} />
      ) : (
        <Card>
          <CardContent>
            <h2 className='text-3xl font-bold pb-1 border-b-green-300 border-b-2'>
              {item.title}
            </h2>
            <div className='text-lg'>{item.description}</div>
            <div className='h-5 italic text-end'>
              {item.category && <span>Category: </span>}
              {item.category}
            </div>
          </CardContent>
          <CardActions className='flex justify-between'>
            <div>
              <Button
                onClick={onDeleteItem}
                sx={{
                  marginRight: 1,
                }}
                size='small'
                variant='contained'
                color='error'
              >
                Delete
              </Button>
              <Button
                onClick={onEditItem}
                size='small'
                variant='contained'
                color='warning'
              >
                Edit
              </Button>
            </div>
            <div className='text-violet-700'>{item.weight} kg</div>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default GoodsItem;
