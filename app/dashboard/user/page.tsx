"use client";

import { Button } from "@/components/ui/button";
import { useHeadshots } from "@/lib/hooks";
import { useUser } from "@/lib/context";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Coins,
  CreditCard,
  Loader2,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
  const { user } = useUser();
  const { data, isLoading } = useHeadshots({ limit: 12, offset: 0 });

  const headshots = data?.headshots ?? [];
  const total = data?.pagination?.total ?? headshots.length;
  const processing = headshots.filter((h) => h.status === "processing").length;
  const completed = headshots.filter((h) => h.status === "completed").length;

  // Flatten recent generated images for a quick gallery preview
  const recentImages = headshots
    .filter((h) => h.status === "completed")
    .flatMap((h) => h.generatedHeadshots)
    .slice(0, 8);

  const firstName = user?.name?.trim()?.split(" ")[0] || "there";

  const stats = [
    { icon: Coins, label: "Credits available", value: user?.credits ?? 0 },
    { icon: Camera, label: "Headshot sessions", value: total },
    { icon: CheckCircle2, label: "Completed", value: completed },
    { icon: Loader2, label: "Processing", value: processing, spin: processing > 0 },
  ];

  const actions = [
    {
      icon: Sparkles,
      title: "Generate headshots",
      desc: "Upload a photo and pick your styles.",
      href: "/dashboard/user/headshots",
      cta: "Start generating",
    },
    {
      icon: CreditCard,
      title: "Buy credits",
      desc: "Top up to generate more headshots.",
      href: "/dashboard/user/credits",
      cta: "View packages",
    },
    {
      icon: UserIcon,
      title: "Your profile",
      desc: "View your account details.",
      href: "/dashboard/user/profile",
      cta: "Open profile",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Welcome back, {firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate professional AI headshots and manage your account.
          </p>
        </div>
        <Link href="/dashboard/user/headshots">
          <Button className="gap-2">
            <Sparkles className="size-4" />
            New headshots
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className={`size-5 ${s.spin ? "animate-spin" : ""}`} />
            </div>
            <div className="mt-3 font-heading text-2xl font-semibold">
              {isLoading && s.label !== "Credits available" ? "—" : s.value}
            </div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Low credits nudge */}
      {user && user.credits <= 0 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Coins className="size-5 text-primary" />
            <p className="text-sm">
              You’re out of credits. Buy a package to keep generating headshots.
            </p>
          </div>
          <Link href="/dashboard/user/credits">
            <Button size="sm" className="gap-1.5">
              Buy credits <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
        {actions.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <a.icon className="size-5" />
            </div>
            <h3 className="mt-3 font-heading font-medium">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              {a.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      {/* Recent headshots */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-medium">Recent headshots</h2>
          <Link
            href="/dashboard/user/headshots"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : recentImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {recentImages.map((img) => (
              <div
                key={img.key}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={`${img.style} headshot`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium capitalize backdrop-blur">
                  {img.style}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Camera className="size-6" />
            </div>
            <h3 className="mt-4 font-heading font-medium">No headshots yet</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Upload a photo and generate your first set of professional AI headshots.
            </p>
            <Link href="/dashboard/user/headshots" className="mt-5">
              <Button className="gap-2">
                <Sparkles className="size-4" />
                Generate headshots
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
