import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@/components';
import { GOOGLE_CLIENT_ID } from '@/config';
import { Modal, useAuth } from '@/hooks';
import { axiosClient, login } from '@/lib';

import { SignupModal } from './SignupModal';

declare global {
  interface Window {
    google: any;
  }
}

type Props = {
  closeModal: () => void;
  openModal: () => void;
  isOpen: boolean;
};

export const SignUp = ({ isOpen, closeModal, openModal }: Props) => {
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async (response: any) => {
    const data = JSON.stringify({ credential: response.credential });

    try {
      const response = await axiosClient.post('/auth/signin', data);

      if (response?.data?.user) {
        const redirect = searchParams.get('redirect');
        setUser(response.data.user._doc);
        login(response?.data?.user?.token);
        if (redirect) {
          navigate(redirect);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const response = await axiosClient.post('/auth/signin-with-email', {
        email,
        password,
      });

      if (response?.data?.user) {
        const redirect = searchParams.get('redirect');
        console.log(response.data.user);

        setUser(response.data.user._doc);
        login(response?.data?.user?.token);
        if (redirect) {
          navigate(redirect);
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen && window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      window.google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
        theme: 'filled_black',
        text: 'continue_with',
        shape: 'pill',
      });
    }
  }, [isOpen]);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button onClick={openModal}>Sign in</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <SignupModal signInWithEmail={signInWithEmail} />
      </Modal>
      <Toaster />
    </main>
  );
};
