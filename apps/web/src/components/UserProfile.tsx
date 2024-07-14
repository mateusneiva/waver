"use client";

import { useAuth } from "../context/AuthContext";

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <img
        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
        alt={user.username}
      />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
