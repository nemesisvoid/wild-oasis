import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      // queryClient.setQueryData('user', user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('user account updated successfully');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}
