"use client";

import {
  CheckCircle2,
  CircleDollarSign,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useAdminOrders, useAdminUsers } from "@/lib/hooks";
import { PaymentStatus } from "@/lib/types";

export default function AdminDashboardPage() {
  const { data: usersData, isLoading: usersLoading } = useAdminUsers();
  // Pull a large page so revenue/counts reflect the whole history.
  const { data: ordersData, isLoading: ordersLoading } = useAdminOrders({
    limit: 1000,
    page: 1,
  });

  const orders = ordersData?.orders ?? [];
  const completedOrders = orders.filter(
    (o) => o.status === PaymentStatus.COMPLETED
  );
  const revenue = completedOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

  const totalUsers = usersData?.total ?? usersData?.users?.length ?? 0;
  const totalOrders = ordersData?.pagination?.total ?? orders.length;

  const stats = [
    { icon: Users, label: "Total users", value: totalUsers, loading: usersLoading },
    { icon: ShoppingCart, label: "Total orders", value: totalOrders, loading: ordersLoading },
    { icon: CheckCircle2, label: "Completed orders", value: completedOrders.length, loading: ordersLoading },
    {
      icon: CircleDollarSign,
      label: "Revenue",
      value: `$${revenue.toFixed(2)}`,
      loading: ordersLoading,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your platform and users
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="size-5" />
            </div>
            <div className="mt-3 text-2xl font-semibold text-foreground">
              {s.loading ? "—" : s.value}
            </div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Management links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
        <Link href="/dashboard/admin/users">
          <Card className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">User Management</h2>
                <p className="text-muted-foreground">
                  Manage users, roles, and credits
                </p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/admin/orders">
          <Card className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Order Management</h2>
                <p className="text-muted-foreground">
                  Create manual orders for users
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
