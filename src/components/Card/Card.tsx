import { ReactElement, useState } from 'react';

import { OpenPill } from '@/components/Card/OpenPill';
import { TimePill } from '@/components/Card/TimePill';

import styles from './Card.module.css';
import { RightArrowSVG } from '@/components/Card/RightArrowSVG';

interface CardProps {
  id: string;
  name: string;
  image: string;
  timeMinutes: number;
}

export const Card = ({ id, name, image, timeMinutes }: CardProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  return (
    <div className={styles.card}>
      <div className={styles.pillGroup}>
        <OpenPill id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
        {isOpen && <TimePill minutes={timeMinutes} />}
      </div>

      <h2 className={styles.name}>{name}</h2>
      {isOpen && (
        <div className={styles.arrow}>
          <RightArrowSVG />
        </div>
      )}

      <img className={!isOpen ? styles.closed : ''} src={image} alt={name} width={150} height={150} />
    </div>
  );
};
