import { LogoSVG } from '@/components/LogoSVG';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <LogoSVG aria-label="Munchies logo" />
      </header>
    </div>
  );
}
