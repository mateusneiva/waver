"use client";

import { useState, useEffect, createContext, useContext } from "react";

interface IUser {
  id: string;
  username: string;
  avatar: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (userData: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: IUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
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

// export const ProtectRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     const clientId = process.env.DISCORD_CLIENT_ID;
//     const redirectUri = process.env.DISCORD_REDIRECT_URI;

//     return redirect(
//       `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify+guilds+gdm.join+email+guilds.join+connections`
//     );
//   }

//   return children;
// };
