import React, { createContext, useContext, useState } from "react";

interface AuthContextData {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: string | null;
  username: string | null;
  setUserData: (userId: string | null, username: string | null) => void;
}

const AuthContext = createContext<AuthContextData>({
  token: null,
  setToken: () => {},
  userId: null,
  username: null,
  setUserData: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const setToken = (token: string | null) => {
    setTokenState(token);
  };

  const setUserData = (userId: string | null, username: string | null) => {
    setUserId(userId);
    setUsername(username);
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, userId, username, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
