import { UserProvider } from "@/lib/context";
import { getCurrentUserServer } from "@/lib/util";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // Server side checking if user is authenticated

  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/login");
  }
  return <UserProvider user={user}>{children}</UserProvider>;
};

export default DashboardLayout;
