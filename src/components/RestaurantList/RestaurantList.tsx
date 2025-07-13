'use client';
import { ReactElement, useEffect, useMemo, useState } from 'react';

import { Card } from '@/components/Card';
import { BASE_URL } from '@/utils/api';

import styles from './RestaurantList.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { withinTimeRange } from '@/utils/withinRange';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { filtersSlice } from '@/store/slices/filters/filtersSlice';
import { convertPriceToRange } from '@/utils/convertPriceToRange';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

/** Filtered Card lists of Restaurants */
export const RestaurantList = (): ReactElement => {
  const dispatch = useAppDispatch();

  const categoryFilter = useSelector((state: RootState) => state.filter.category);
  const timeFilter = useSelector((state: RootState) => state.filter.timeRange);
  const priceFilter = useSelector((state: RootState) => state.filter.price);
  const priceFilterLookup = useSelector((state: RootState) => state.filter.priceFilterLookup);

  const [loading, setLoading] = useState(true);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[] | null>(null); // from API

  const filteredRestaurants = useMemo((): Restaurant[] | null => {
    if (allRestaurants === null) return null;

    let filteredRestaurants = [...allRestaurants];

    if (categoryFilter !== null) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        restaurant.filter_ids.includes(categoryFilter),
      );
    }

    if (timeFilter !== null) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        withinTimeRange({ minutes: restaurant.delivery_time_minutes, range: timeFilter }),
      );
    }

    if (priceFilter !== null) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) => {
        return priceFilterLookup && priceFilterLookup[restaurant.price_range_id] === priceFilter;
      });
    }

    return filteredRestaurants;
  }, [categoryFilter, timeFilter, priceFilter]);

  useEffect(() => {
    if (allRestaurants === null) {
      fetch('/api/restaurants')
        .then(async (res) => {
          const response = await res.json();

          if (response.status === 'success') {
            setAllRestaurants(response.data.restaurants);
            setLoading(false);

            if (priceFilterLookup === null) {
              // Build out price ID dictionary that we then use while filtering on price.
              // This is to pull it in up front not hit the price-range api each filter
              const priceIds = [
                ...new Set(
                  response.data.restaurants.map(
                    (restaurant: { price_range_id: any }) => restaurant.price_range_id,
                  ),
                ),
              ];

              priceIds.forEach((priceId) => {
                fetch(`/api/price-range/${priceId}`).then(async (res) => {
                  const response = await res.json();

                  if (response.data.range) {
                    const convertedRange = convertPriceToRange(response.data.range);
                    dispatch(filtersSlice.actions.addPriceLookup({ [priceId as string]: convertedRange }));
                  }
                });
              });
            }
          }
        })
        .catch((err) => {
          console.log('RestaurantList - API Error', err);
        });
    }
  }, []);

  return (
    <div className={styles.restaurantList}>
      <h2>Restaurant’s</h2>
      {loading ? (
        <div>Loading restaurants...</div>
      ) : (
        <section className={styles.cardSection}>
          {filteredRestaurants?.map((restaurant) => (
            <Card
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              image={`${BASE_URL}${restaurant.image_url}`}
              timeMinutes={restaurant.delivery_time_minutes}
            />
          ))}
        </section>
      )}
    </div>
  );
};
