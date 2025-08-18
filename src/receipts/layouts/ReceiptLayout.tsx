import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";

export const ReceiptLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <CustomHeader />
      <Outlet />
    </div>
  );
};
