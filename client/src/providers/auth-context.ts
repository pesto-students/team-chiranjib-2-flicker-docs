import React from 'react';

// Creating the context object and passing the default values.

export type User = {
  _id?: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
  token: string;
  documents?: Array<string>;
  sharedDocuments?: Array<string>;
  subscription?: {
    subscriptionId: string;
    customerId: string;
    priceId: string;
    amount: number;
    currency: string;
    created: number;
    current_period_start: number;
    current_period_end: number;
  };
} | null;

const user: User = null;
const setUser = () => {};
interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
}

const authContext = React.createContext<AuthContextType>({ user, setUser });

export default authContext;
