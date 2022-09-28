import React, { useCallback, useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../rdx/hooks';
import { selectAllGoods } from '../rdx/goods/selectors';
import Checkbox from '@mui/material/Checkbox';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { goodsItemKeys } from '../constants/goodsItemKeys';

const GoodsListSettings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const goods = useAppSelector(selectAllGoods);

  const filterParam = useMemo(
    () => searchParams.get('filter') || '',
    [searchParams]
  );
  const sortParam = useMemo(
    () => searchParams.get('sort') || '',
    [searchParams]
  );
  const sortWayParam = useMemo(() => searchParams.get('isAsc'), [searchParams]);

  const onFilterChange = useCallback(
    (ev: SelectChangeEvent<string>) => {
      const value = ev.target.value;
      const filterSearchParams = new URLSearchParams(searchParams);
      if (value) {
        filterSearchParams.set('filter', value);
      } else {
        filterSearchParams.delete('filter');
      }
      setSearchParams(filterSearchParams);
    },
    [setSearchParams, searchParams]
  );
  const onSortChange = useCallback(
    (ev: SelectChangeEvent<string>) => {
      const sortValue = ev.target.value;

      const sortSearchParams = new URLSearchParams(searchParams);
      if (sortValue) {
        sortSearchParams.set('sort', sortValue);
        sortSearchParams.set('isAsc', 'true');
      } else {
        sortSearchParams.delete('sort');
        sortSearchParams.delete('isAsc');
      }
      setSearchParams(sortSearchParams);
    },
    [setSearchParams, searchParams]
  );
  const onSortWayChange = useCallback(() => {
    const sortSearchParams = new URLSearchParams(searchParams);
    sortSearchParams.set(
      'isAsc',
      searchParams.get('isAsc') === 'true' ? 'false' : 'true'
    );
    setSearchParams(sortSearchParams);
  }, [searchParams, setSearchParams]);

  const filterOptions = useMemo(
    () => [...new Set(goods.map((good) => good.category).filter(Boolean))],
    [goods]
  );

  return (
    <div>
      <FormControl
        sx={{
          width: 100,
        }}
      >
        <InputLabel id='sort-label'>Sort</InputLabel>
        <Select
          labelId='sort-label'
          value={sortParam}
          onChange={onSortChange}
          renderValue={(val) => <span className='capitalize'>{val}</span>}
          label='Sort'
          autoWidth
        >
          <MenuItem value=''>No sort</MenuItem>
          {goodsItemKeys.map((goodsItemKey) => (
            <MenuItem
              onClick={onSortWayChange}
              value={goodsItemKey}
              key={goodsItemKey}
              className='capitalize'
            >
              {goodsItemKey}
              {sortParam === goodsItemKey && (
                <Checkbox
                  checked={sortWayParam === 'true'}
                  icon={
                    <ArrowUpwardIcon
                      sx={{
                        height: 20,
                        width: 20,
                        transform: 'rotate(180deg)',
                      }}
                    />
                  }
                  disableRipple
                  checkedIcon={
                    <ArrowUpwardIcon
                      sx={{
                        height: 20,
                        width: 20,
                      }}
                    />
                  }
                />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: 100,
          marginLeft: 1,
        }}
      >
        <InputLabel id='filter-label'>Filter</InputLabel>
        <Select
          labelId='filter-label'
          value={filterParam}
          label='Filter'
          onChange={onFilterChange}
        >
          <MenuItem value=''>No filter</MenuItem>
          {filterOptions.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default GoodsListSettings;
