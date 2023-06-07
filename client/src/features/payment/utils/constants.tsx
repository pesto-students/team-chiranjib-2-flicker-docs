import { CheckCircle } from 'lucide-react';

const TickIcon = () => <CheckCircle className='h-5' />;

export const StarterPlan = {
  heading: 'Starter',
  title: 'Best option for personal use.',
  price: '0',
  features: [
    {
      title: 'Upto 10 documents',
      icon: <TickIcon />,
    },
    {
      title: 'Can share with 3 people',
      icon: <TickIcon />,
    },
    {
      title: 'AI Assistant',
      icon: <TickIcon />,
    },
  ],
};

export const ProfessionalPlan = {
  heading: 'Professional',
  title: 'Relevant for professional writers.',
  price: '25',
  features: [
    {
      title: 'Upto 100 documents',
      icon: <TickIcon />,
    },
    {
      title: 'Can share with 10 people',
      icon: <TickIcon />,
    },
    {
      title: 'AI Assistant',
      icon: <TickIcon />,
    },
  ],
};

export const EnterprisePlan = {
  heading: 'Enterprise',
  title: 'Best for large scale uses.',
  price: '40',
  features: [
    {
      title: 'Upto 500 documents',
      icon: <TickIcon />,
    },
    {
      title: 'Can share with 20 people',
      icon: <TickIcon />,
    },
    {
      title: 'AI Assistant',
      icon: <TickIcon />,
    },
  ],
};
