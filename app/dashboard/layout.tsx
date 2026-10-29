import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { UserProvider } from "@/lib/context";
import { getCurrentUserServer } from "@/lib/util/auth-server";
import { redirect } from "next/navigation";

// Auth-gated dashboard: reads cookies + fetches the current user per request,
// so it can't be prerendered. Allow it to render as a blocking dynamic route.
export const instant = false;

const DashboardRootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Server side checking if user is authenticated

  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserProvider user={user}>
      {/* Dashboard Layout */}
      <DashboardLayout>{children}</DashboardLayout>
    </UserProvider>
  );
};

export default DashboardRootLayout;