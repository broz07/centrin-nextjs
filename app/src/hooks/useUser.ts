import { useContext } from 'react';
import UserContext from '@centrin/contexts/UserContext';

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
