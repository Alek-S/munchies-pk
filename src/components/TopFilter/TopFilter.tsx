'use client';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { Button } from '@/components/Button';
import { BASE_URL } from '@/utils/api';

import styles from './TopFilter.module.css';
import { filtersSlice } from '@/store/slices/filters/filtersSlice';
import { useAppDispatch } from '@/hooks/reduxHooks';

export const TopFilter = (): ReactElement => {
  const dispatch = useAppDispatch();

  const categoryFilter = useSelector((state: RootState) => state.filter.category);
  const filterOptions = useSelector((state: RootState) => state.filter.filterOptions);

  const handleClick = ({ id }: { id: string }) => {
    dispatch(filtersSlice.actions.setCategory(categoryFilter === id ? null : id));
  };

  return (
    <div className={styles.topFilter}>
      {!filterOptions ? (
        <div>Loading filters...</div>
      ) : (
        <div className={styles.filterBtnGroup}>
          {filterOptions.map((filterOption) => (
            <Button
              key={filterOption.id}
              id={filterOption.id}
              onClick={handleClick}
              active={categoryFilter === filterOption.id}
            >
              <div className={styles.btnContent}>
                <p>{filterOption.name}</p>
                <img
                  src={`${BASE_URL}${filterOption.image_url}`}
                  alt={filterOption.name}
                  width={80}
                  height={80}
                />
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
