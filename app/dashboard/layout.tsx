import { getCurrentUserServer } from "@/lib/util";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
   // Server side checking if user is authenticated

   const user = await getCurrentUserServer();

   if (!user) {
     redirect("/auth/login");
   }
  return children;
};

export default DashboardLayout;
