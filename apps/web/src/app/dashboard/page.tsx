"use client";

import { useAuth } from "../../context/AuthContext";
import { UserProfile } from "../../components/UserProfile";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      {isAuthenticated && <UserProfile />}
    </div>
  );
}
