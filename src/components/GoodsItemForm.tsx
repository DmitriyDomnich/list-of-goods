import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import {
  createGoodsItemThunk,
  updateGoodsItemThunk,
} from '../rdx/goods/thunks';
import { useAppDispatch } from '../rdx/hooks';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useGoodsItem } from '../hooks/useGoodsItem';
import { useSelector } from 'react-redux';
import {
  selectIsDataAdding,
  selectIsDataLoading,
} from '../rdx/goods/selectors';

const GoodsItemForm = () => {
  const goodsItem = useGoodsItem();

  const [title, setTitle] = useState(goodsItem?.title || '');
  const [weight, setWeight] = useState(goodsItem?.weight || 0.1);
  const [description, setDescription] = useState(goodsItem?.description || '');
  const [category, setCategory] = useState(goodsItem?.category || '');

  const isLoading = useSelector(selectIsDataLoading);
  const isAdding = useSelector(selectIsDataAdding);

  const dispatch = useAppDispatch();

  const onTitleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setTitle(ev.target.value);
    },
    [setTitle]
  );
  const onWeightChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setWeight(ev.target.value);
    },
    [setWeight]
  );
  const onDescriptionChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setDescription(ev.target.value);
    },
    [setDescription]
  );
  const onCategoryChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setCategory(ev.target.value);
    },
    [setCategory]
  );

  const onSubmit = useCallback(
    (ev: any) => {
      ev.preventDefault();
      const item = {
        ...goodsItem!,
        weight: weight.toString(),
        title,
        description,
        category,
      };
      if (goodsItem) {
        dispatch(updateGoodsItemThunk(item));
      } else {
        dispatch(createGoodsItemThunk(item));
      }
    },
    [dispatch, goodsItem, title, description, category, weight]
  );

  useEffect(() => {
    setTitle(goodsItem?.title || '');
    setWeight(goodsItem?.weight || 0.1);
    setDescription(goodsItem?.description || '');
    setCategory(goodsItem?.category || '');
  }, [goodsItem]);

  if (isLoading) {
    return (
      <div className='text-center'>
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return (
    <form className='flex justify-center m-3' onSubmit={onSubmit}>
      <div className='w-64 sm:w-96 flex flex-col'>
        <TextField
          fullWidth
          label='Title'
          value={title}
          onChange={onTitleChange}
          required
        >
          {title}
        </TextField>
        <TextField
          fullWidth
          sx={{
            marginTop: 2,
          }}
          type='number'
          InputProps={{
            inputProps: {
              step: 0.1,
              min: 0.1,
            },
          }}
          label='Weight'
          value={weight}
          onChange={onWeightChange}
        >
          {weight}
        </TextField>
        <TextField
          fullWidth
          multiline
          sx={{
            marginBlock: 2,
          }}
          rows={2}
          value={description}
          onChange={onDescriptionChange}
          required
          label='Description'
        >
          {description}
        </TextField>
        <TextField
          fullWidth
          value={category}
          onChange={onCategoryChange}
          label='Category'
        >
          {category}
        </TextField>
        <Button
          disabled={isAdding}
          type='submit'
          sx={{
            marginTop: 1,
            marginInline: 'auto',
            width: '50%',
          }}
          variant='contained'
          color='success'
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default GoodsItemForm;
