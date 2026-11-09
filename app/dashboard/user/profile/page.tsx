"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/lib/hooks";
import { useUser } from "@/lib/context";
import { UserRole } from "@/lib/types";
import {
  BadgeCheck,
  Calendar,
  Coins,
  LogOut,
  Mail,
  ShieldCheck,
  User as UserIcon,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => router.push("/auth/login"),
    });
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-muted-foreground">
        Loading your profile…
      </div>
    );
  }

  const displayName = user.name?.trim() || "Unnamed user";
  const initials = (user.name?.trim() || user.email)
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  const details = [
    {
      icon: ShieldCheck,
      label: "Role",
      value: (
        <Badge variant={user.role === UserRole.ADMIN ? "default" : "secondary"}>
          {user.role}
        </Badge>
      ),
    },
    {
      icon: Coins,
      label: "Credits",
      value: <span className="font-medium">{user.credits}</span>,
    },
    {
      icon: BadgeCheck,
      label: "Account status",
      value: (
        <Badge variant={user.isActive === false ? "destructive" : "secondary"}>
          {user.isActive === false ? "Inactive" : "Active"}
        </Badge>
      ),
    },
    {
      icon: Calendar,
      label: "Member since",
      value: <span>{formatDate(user.createdAt)}</span>,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account details and preferences.
        </p>
      </div>

      {/* Identity card */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
            {initials || <UserIcon className="size-7" />}
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-heading text-xl font-medium">
              {displayName}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-4" />
              <span className="truncate">{user.email}</span>
              {user.isEmailVerified ? (
                <Badge variant="secondary" className="gap-1">
                  <BadgeCheck className="size-3.5 text-primary" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <XCircle className="size-3.5" />
                  Unverified
                </Badge>
              )}
            </div>
          </div>
        </div>

        {!user.isEmailVerified && (
          <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
            Your email isn’t verified yet.{" "}
            <Link
              href="/auth/resend-verification"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Resend verification email
            </Link>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        {details.map((d) => (
          <div
            key={d.label}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <d.icon className="size-4" />
              </span>
              {d.label}
            </div>
            <div className="text-sm">{d.value}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard/user/credits" className="sm:flex-1">
          <Button className="w-full gap-2">
            <Coins className="size-4" />
            Buy credits
          </Button>
        </Link>
        <Button
          variant="outline"
          className="gap-2 sm:flex-1"
          onClick={handleLogout}
          disabled={isPending}
        >
          <LogOut className="size-4" />
          {isPending ? "Logging out…" : "Log out"}
        </Button>
      </div>
    </div>
  );
}
