import { ReactElement, useEffect, useState } from 'react';

import styles from './Card.module.css';

export const OpenPill = ({
  id,
  isOpen,
  setIsOpen,
}: {
  id: string;
  isOpen: boolean | null;
  setIsOpen: (e: boolean) => void;
}): ReactElement => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen === null) {
      fetch(`/api/open/${id}`)
        .then(async (res) => {
          const response = await res.json();

          if (response.status === 'success') {
            setIsOpen(response.data.is_open);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log('RestaurantList - API Error', err);
        });
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className={styles.restPill}>
          <div className={`${styles.statusIcon} ${!isOpen ? styles.closed : ''}`} />
          <p>{isOpen ? 'Open' : 'Closed'}</p>
        </div>
      )}
    </div>
  );
};
