import { LogoSVG } from '@/components/LogoSVG';
import { SideFilter } from '@/components/SideFilter/SideFilter';
import { TopFilter } from '@/components/TopFilter';

import styles from './page.module.css';
import { RestaurantList } from '@/components/RestaurantList';

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <LogoSVG aria-label="Munchies logo" />
      </header>

      <main>
        <aside>
          <SideFilter />
        </aside>

        <section className={styles.mainSection}>
          <TopFilter />

          <RestaurantList />
        </section>
      </main>
    </div>
  );
}
