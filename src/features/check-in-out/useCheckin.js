import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: data => {
      toast.success(`booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: () => toast.error('there was an error checking in'),
  });

  return { checkin, isCheckingIn };
}
