import { CustomHeader } from "@/receipts/components/CustomHeader";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <CustomHeader />
      <Outlet />
    </div>
  );
};
