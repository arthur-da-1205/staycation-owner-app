// import { Emitter } from '@libraries/emitter';
import { TokenError } from '@libraries/error';
import { useAtomicValue } from '@libraries/state';
import { LocalStorage } from '@libraries/storage';
import { errorAtom } from '@states/atoms/error.atom';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
// import { useGetProfileMeQuery } from '@resources/gql/profile.gql';

interface IContextProps {
  isAuthenticated: boolean;
  user: any | null;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  setLogout: () => void;
}

const AppContext = createContext<IContextProps>({
  isAuthenticated: false,
  user: null,
  setToken: () => {},
  setUser: () => {},
  setLogout: () => {},
});

interface IProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<IProviderProps> = ({ children }) => {
  const localToken: any = LocalStorage.getItem('user_token');
  const localUser: any = LocalStorage.getItem('user_profile');
  const [token, setTokenState] = useState<string | null>(localToken);
  const [user, setUserState] = useState<any | null>(localUser ? JSON.parse(localUser) : null);
  const globalError = useAtomicValue(errorAtom);
  const socket = useRef<any>();
  // anomaly, ERROR must be defined outside provider

  // const [getProfile] = useGetProfileMeQuery();

  const setToken = (token: string | null) => {
    if (!token) {
      LocalStorage.removeItem('user_token');
    } else {
      LocalStorage.setItem('user_token', token);
    }

    setTokenState(token);
  };

  const setUser = (user: any | null) => {
    if (!user) {
      LocalStorage.removeItem('user_profile');
    } else {
      LocalStorage.setItem('user_profile', user);
    }

    setUserState(user);
  };

  const setLogout = () => {
    if (socket.current) {
      socket.current.disconnect();
    }

    // do not change the order
    setUserState(null);
    setTokenState(null);
    LocalStorage.clear();
  };

  // ON FIRST LOAD
  // useEffect(() => {
  //   if (localToken) {
  //     getProfile().then(({ data }) => {
  //       const user = data?.data?.profileMe;
  //       if (user) {
  //         setUser(user);
  //       }
  //     });
  //   }
  // }, []);

  // ON TOKEN SET
  // useEffect(() => {
  //   if (token) {
  //     socket.current = new Socket(import.meta.env.VITE_WS_URL, { params: { token } });
  //     socket.current.connect();

  //     const taskChannel = socket.current.channel('room:task', {});

  //     taskChannel.join();

  //     taskChannel.on('TASK/EVENT/START', (args: any) => {
  //       Emitter.emit('task_start', args);
  //     });
  //     taskChannel.on('TASK/EVENT/FINISH', (args: any) => {
  //       Emitter.emit('task_finish', args);
  //     });
  //   }
  // }, [token]);

  useEffect(() => {
    if (globalError instanceof TokenError) {
      setLogout();
    }
  }, [globalError]);

  const contextPayload = React.useMemo(
    () => ({
      isAuthenticated: !!token,
      user,
      setToken,
      setUser,
      setLogout,
    }),
    [token, user],
  );

  return <AppContext.Provider value={contextPayload}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
