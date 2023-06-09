import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks';
import { User } from '@/interfaces/user.interface';
import { axiosClient } from '@/lib';

export const Success = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useQuery({
    queryKey: ['paid_user'],
    queryFn: () => {
      return axiosClient.get(`/payment/verify/${user?.email}`);
    },
    select: (res) => res.data as User,
    enabled: true,
  });

  if (user?.subscription) {
    navigate('/plans?s=1');
  }

  return (
    <>
      <div>Please wait we are processing your payment.</div>
    </>
  );
};
