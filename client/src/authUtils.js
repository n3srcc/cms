const jwt = require("jwt-decode");

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const getToken = () => {
  return localStorage.getItem('token');
};

const isAdmin = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwt.jwtDecode(token);
    return decodedToken.role === 'admin';
  }
  return false;
};

const isCreator = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwt.jwtDecode(token);
    return decodedToken.role === 'admin' || decodedToken.role === 'creator';
  }
  return false;
};

export { isAuthenticated, getToken, isAdmin, isCreator };
