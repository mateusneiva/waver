"use client";

import { redirect } from "next/navigation";
import { useState, useEffect, createContext, useContext } from "react";

import { api } from "../services/API";
import { Spinner } from "../components/UI/Spinner";

export interface IUser {
  id: string;
  avatar: string;
  displayName: string;
  username: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
  login: (userData: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData: IUser) => {};

  const logout = () => {};

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      await api
        .get<IUser>("/auth/status")
        .then(({ data }) => {
          console.log(data);
          setUser(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const ProtectRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && !user) {
    return redirect("http://localhost:5002/api/auth/login");
  }

  return children;
};
