import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signin, signup, SigninDTO, SignupDTO } from '@/services/auth/auth.service';

export function useSignin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SigninDTO) => signin(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData([ 'user' ], data.user);
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupDTO) => signup(data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData([ 'user' ], data.user);
    },
  });
}
