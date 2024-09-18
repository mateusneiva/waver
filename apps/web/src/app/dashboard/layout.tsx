import { ProtectRoute } from "../../context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectRoute>{children}</ProtectRoute>;
}
