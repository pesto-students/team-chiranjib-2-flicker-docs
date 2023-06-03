import React from 'react';

// Creating the context object and passing the default values.
const user = {
  email: '',
  firstName: '',
  lastName: '',
  picture: '',
};

const authContext = React.createContext({ user });

export default authContext;
