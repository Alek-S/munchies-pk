import { ReactElement, ReactNode } from 'react';

import styles from './Button.module.css';

export const Button = ({
  id,
  onClick,
  children,
  active = false,
}: {
  id: string;
  active?: boolean;
  onClick?: ({ id, event }: { id: string; event: any }) => void;
  children: ReactNode;
}): ReactElement => {
  return (
    <button
      className={`${styles.Button} ${active ? styles.active : ''}`}
      onClick={(e) => onClick && onClick({ id, event: e })}
    >
      {children}
    </button>
  );
};
