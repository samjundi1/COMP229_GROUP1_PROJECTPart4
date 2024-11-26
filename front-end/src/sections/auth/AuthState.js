import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('sessionToken');
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
