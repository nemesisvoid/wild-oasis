import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/', { replace: true });
      toast.success('logout successful');
    },

    onError: err => {
      toast.error(err.message);
    },
  });

  return { logout, isLoading };
}
