'use client';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { Button } from '@/components/Button';
import { BASE_URL } from '@/utils/api';

import styles from './TopFilter.module.css';

export const TopFilter = (): ReactElement => {
  const filterOptions = useSelector((state: RootState) => state.filter.filterOptions);

  console.log({ filterOptions });

  return (
    <div className={styles.topFilter}>
      {!filterOptions ? (
        <div>Loading filters...</div>
      ) : (
        <div className={styles.filterBtnGroup}>
          {filterOptions.map((filterOption) => (
            <Button key={filterOption.id} id={filterOption.id}>
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
