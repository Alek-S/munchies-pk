'use client';
import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/Button';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { filtersSlice, RangeFilter } from '@/store/slices/filters/filtersSlice';
import { RootState } from '@/store';

import styles from './SideFilter.module.css';

/** filter selection on the left side menu */
export const SideFilter = (): ReactElement => {
  const dispatch = useAppDispatch();

  const categoryFilter = useSelector((state: RootState) => state.filter.category);
  const timeFilter = useSelector((state: RootState) => state.filter.timeRange);
  const priceFilter = useSelector((state: RootState) => state.filter.price);
  const filterOptions = useSelector((state: RootState) => state.filter.filterOptions);

  const [loading, setLoading] = useState(true);

  const handleCategoryClick = ({ id }: { id: string }) => {
    dispatch(filtersSlice.actions.setCategory(categoryFilter === id ? null : id));
  };

  const handleRangeClick = ({ id }: { id: string }) => {
    const selectedRange = id as RangeFilter;
    dispatch(filtersSlice.actions.setTimeRange(timeFilter === selectedRange ? null : selectedRange));
  };

  const handlePriceClick = ({ id }: { id: string }) => {
    const selectedPrice = id as RangeFilter;
    dispatch(filtersSlice.actions.setPrice(priceFilter === selectedPrice ? null : selectedPrice));
  };

  useEffect(() => {
    if (filterOptions === null) {
      fetch('/api/filter')
        .then(async (res) => {
          const response = await res.json();

          if (response.status === 'success') {
            dispatch(filtersSlice.actions.setFilterOptions(response.data.filters));
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log('SideFilter - API Error', err);
        });
    }
  }, []);

  return (
    <div className={styles.sideFilter}>
      {loading || !filterOptions ? (
        <div>Loading filters...</div>
      ) : (
        <>
          <h2>Filter</h2>
          <div className={styles.sections}>
            <section>
              <h3>food category</h3>
              <div className={styles.catButtonGroup}>
                {filterOptions.slice(0, 4).map((filter) => (
                  <Button
                    key={filter.id}
                    id={filter.id}
                    onClick={handleCategoryClick}
                    active={categoryFilter === filter.id}
                  >
                    {filter.name}
                  </Button>
                ))}
              </div>
            </section>

            <section>
              <h3>delivery time</h3>
              <div className={styles.buttonGroup}>
                <Button id={'low'} onClick={handleRangeClick} active={timeFilter === 'low'}>
                  0-10 min
                </Button>
                <Button id={'medium'} onClick={handleRangeClick} active={timeFilter === 'medium'}>
                  10-30 min
                </Button>
                <Button id={'high'} onClick={handleRangeClick} active={timeFilter === 'high'}>
                  30-60 min
                </Button>
                <Button id={'extraHigh'} onClick={handleRangeClick} active={timeFilter === 'extraHigh'}>
                  1 hour+
                </Button>
              </div>
            </section>

            <section>
              <h3>Price Range</h3>
              <div className={styles.buttonGroup}>
                <Button id={'low'} onClick={handlePriceClick} active={priceFilter === 'low'}>
                  $
                </Button>
                <Button id={'medium'} onClick={handlePriceClick} active={priceFilter === 'medium'}>
                  $$
                </Button>
                <Button id={'high'} onClick={handlePriceClick} active={priceFilter === 'high'}>
                  $$
                </Button>
                <Button id={'extraHigh'} onClick={handlePriceClick} active={priceFilter === 'extraHigh'}>
                  $$$$
                </Button>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};
