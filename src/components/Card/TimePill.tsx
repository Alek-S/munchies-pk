import { ReactElement } from 'react';

import styles from './Card.module.css';

export const TimePill = ({ minutes }: { minutes: number }): ReactElement => {
  return <div className={styles.restPill}>{minutes} min</div>;
};
