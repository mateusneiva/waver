import { Sidebar } from "../../components/Sidebar";
import { ProtectRoute } from "../../context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectRoute>
      <div className="w-full flex justify-center">
        <div className="flex w-[1200px]">
          <Sidebar />
          {children}
        </div>
      </div>
    </ProtectRoute>
  );
}
