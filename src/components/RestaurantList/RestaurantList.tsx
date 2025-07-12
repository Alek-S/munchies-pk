'use client';
import { ReactElement, useEffect, useMemo, useState } from 'react';

import { Card } from '@/components/Card';
import { BASE_URL } from '@/utils/api';

import styles from './RestaurantList.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

export const RestaurantList = (): ReactElement => {
  const categoryFilter = useSelector((state: RootState) => state.filter.category);
  const timeFilter = useSelector((state: RootState) => state.filter.timeRange);
  const priceFilter = useSelector((state: RootState) => state.filter.price);

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

    return filteredRestaurants;
  }, [categoryFilter, timeFilter, priceFilter]);

  useEffect(() => {
    if (allRestaurants === null) {
      fetch('/api/restaurants')
        .then(async (res) => {
          const response = await res.json();
          console.log(1, response.data.restaurants);

          if (response.status === 'success') {
            setAllRestaurants(response.data.restaurants);
            setLoading(false);
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
