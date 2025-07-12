import { LogoSVG } from '@/components/LogoSVG';
import { SideFilter } from '@/components/SideFilter/SideFilter';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <LogoSVG aria-label="Munchies logo" />
      </header>

      <aside>
        <SideFilter />
      </aside>
    </div>
  );
}
