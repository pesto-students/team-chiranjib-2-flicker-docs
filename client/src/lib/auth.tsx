export const logout = () => {
  localStorage.removeItem('user');
  window.location.reload();
};

export const login = (data: any) => {
  localStorage.setItem('user', data);
  window.location.reload();
};

export const loadUser = () => {
  const theUser = localStorage.getItem('user');

  if (theUser && !theUser.includes('undefined')) {
    return JSON.parse(theUser);
  }

  return null;
};
