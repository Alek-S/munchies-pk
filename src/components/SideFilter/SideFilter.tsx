'use client';
import { ReactElement, useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { filtersSlice } from '@/store/slices/filters/filtersSlice';
import { useSelector } from 'react-redux';

import styles from './SideFilter.module.css';
import { RootState } from '@/store';

interface Filters {
  id: string;
  name: string;
  img_url: string;
}

export const SideFilter = (): ReactElement => {
  const dispatch = useAppDispatch();

  const categoryFilter = useSelector((state: RootState) => state.filter.category);

  const [filters, setFilters] = useState<Filters[] | null>(null);
  const [loading, setLoading] = useState(true);

  const handleClick = ({ id }: { id: string }) => {
    console.log('clicked', { id });
    dispatch(filtersSlice.actions.setCategory(categoryFilter === id ? null : id));
  };

  useEffect(() => {
    if (filters === null) {
      fetch('/api/filter')
        .then(async (res) => {
          const response = await res.json();

          setFilters(response.data.filters);
          setLoading(false);
        })
        .catch((err) => {
          console.log('SideFilter - API Error', err);
        });
    }
  }, []);

  return (
    <div className={styles.sideFilter}>
      {loading || !filters ? (
        <div>Loading filters...</div>
      ) : (
        <>
          <h2>Filter</h2>
          <div className={styles.sections}>
            <section>
              <h3>food category</h3>
              <div className={styles.buttonGroup}>
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    id={filter.id}
                    onClick={handleClick}
                    active={categoryFilter === filter.id}
                  >
                    {filter.name}
                  </Button>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};
