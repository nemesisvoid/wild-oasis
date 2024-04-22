import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const client = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');

  // filter
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };
  // { field: 'status', value: filterValue, method: 'gte' };

  // sort
  const sort = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sort.split('-');
  const sortBy = { field, direction };

  // pagination

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // query

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    client.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ['bookings', filter, sortBy, page + 1],
    });

  if (page > 1)
    client.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, error, count, page };
}
