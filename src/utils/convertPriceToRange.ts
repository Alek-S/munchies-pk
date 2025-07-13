import { RangeFilter } from '@/store/slices/filters/filtersSlice';

/** to convert $, $$, $$$, $$$$ to a RangeFilter */
export const convertPriceToRange = (range: string): RangeFilter | null => {
  switch (range.length) {
    case 1:
      return 'low';

    case 2:
      return 'medium';

    case 3:
      return 'high';

    case 4:
      return 'extraHigh';

    default:
      return null;
  }
};
