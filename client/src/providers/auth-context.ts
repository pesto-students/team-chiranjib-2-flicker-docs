import React from 'react';

// Creating the context object and passing the default values.

export type User = {
  _id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
} | null;

const user: User = null;

interface AuthContextType {
  user: User;
}

const authContext = React.createContext<AuthContextType>({ user });

export default authContext;
