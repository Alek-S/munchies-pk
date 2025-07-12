import { RangeFilter } from '@/store/slices/filters/filtersSlice';

/** uses the delivery time and filter range to determine if it's within the range or not for delivery */
export const withinTimeRange = ({ minutes, range }: { minutes: number; range: RangeFilter }): boolean => {
  switch (range) {
    case 'low':
      return minutes <= 10;

    case 'medium':
      return minutes > 10 && minutes <= 30;

    case 'high':
      return minutes > 30 && minutes <= 60;

    case 'extraHigh':
      return minutes > 60;
  }
};
