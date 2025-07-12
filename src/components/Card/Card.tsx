import { ReactElement, useState } from 'react';

import styles from './Card.module.css';
import { OpenPill } from '@/components/Card/OpenPill';

interface CardProps {
  id: string;
  name: string;
  image: string;
}

export const Card = ({ id, name, image }: CardProps): ReactElement => {
  return (
    <div className={styles.card}>
      <div className={styles.pillGroup}>
        <OpenPill id={id} />
      </div>
    </div>
  );
};
