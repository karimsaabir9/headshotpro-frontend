"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/hooks";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  Download,
  Moon,
  Shield,
  Sparkles,
  Sun,
  Upload,
  Wand2,
  Zap,
} from "lucide-react";

const styles = [
  { name: "Professional", blurb: "Clean corporate look, studio lighting", img: "https://i.pravatar.cc/480?img=12" },
  { name: "Casual", blurb: "Relaxed and friendly, soft natural light", img: "https://i.pravatar.cc/480?img=5" },
  { name: "Creative", blurb: "Artistic styling with bold color", img: "https://i.pravatar.cc/480?img=47" },
  { name: "Executive", blurb: "High-end, formal, confident", img: "https://i.pravatar.cc/480?img=60" },
  { name: "LinkedIn", blurb: "Polished profile-ready portrait", img: "https://i.pravatar.cc/480?img=32" },
];

const features = [
  {
    icon: Wand2,
    title: "AI-Powered",
    desc: "State-of-the-art image models turn a single selfie into studio-grade headshots.",
  },
  {
    icon: Camera,
    title: "5 Professional Styles",
    desc: "Professional, Casual, Creative, Executive and LinkedIn — one upload, many looks.",
  },
  {
    icon: Zap,
    title: "Ready in Minutes",
    desc: "A durable background queue generates your headshots while you grab a coffee.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    desc: "Your photos are processed securely and never shared. You stay in control.",
  },
];

const steps = [
  { icon: Upload, title: "Upload a photo", desc: "Drop in a clear selfie — that's all we need to start." },
  { icon: Wand2, title: "Pick your styles", desc: "Choose from five curated headshot styles and generate." },
  { icon: Download, title: "Download results", desc: "Get high-resolution headshots ready for any platform." },
];

const packages = [
  { name: "Starter", credits: 10, bonus: 0, price: 9.99, desc: "Perfect for trying out AI headshots", popular: false },
  { name: "Popular", credits: 25, bonus: 5, price: 19.99, desc: "Most popular choice", popular: true },
  { name: "Professional", credits: 50, bonus: 15, price: 34.99, desc: "Best value for professionals", popular: false },
  { name: "Business", credits: 100, bonus: 30, price: 59.99, desc: "Ideal for teams", popular: false },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" aria-hidden />;
  const isDark = theme === "dark";
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}

export default function Home() {
  const { data: currentUser } = useCurrentUser();
  const isAuthed = !!currentUser?.user;

  // Compute the year after mount so the prerender doesn't see an unstable
  // `new Date()` at render time (Next.js 16 flags that in client components).
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const primaryHref = isAuthed ? "/dashboard/user" : "/auth/register";
  const primaryLabel = isAuthed ? "Go to Dashboard" : "Get Started Free";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            Headshot<span className="text-primary">Pro</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            {isAuthed ? (
              <Link href="/dashboard/user">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:block">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[500px] max-w-4xl rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            AI headshots from a single selfie
          </div>
          <h1 className="mx-auto max-w-3xl font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
            Studio-quality headshots,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              generated by AI
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Skip the photographer. Upload one photo, choose a style, and get
            professional headshots for LinkedIn, resumes and team pages — in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={primaryHref}>
              <Button size="lg" className="h-12 gap-2 px-6 text-base">
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="h-12 px-6 text-base">
                View pricing
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card to start • 5 styles • High resolution
          </p>

          {/* Style preview grid */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {styles.slice(0, 4).map((s) => (
              <div
                key={s.name}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={`${s.name} headshot example`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-left">
                  <p className="text-sm font-medium">{s.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-4 py-8 text-center">
          {[
            { k: "5", v: "Curated styles" },
            { k: "<5 min", v: "Average turnaround" },
            { k: "1024px", v: "High-res output" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-heading text-2xl font-semibold sm:text-3xl">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to look your best
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built on a modern, secure stack so your headshots are fast, private and consistent.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Three steps to your new headshots
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-border bg-background text-primary">
                  <s.icon className="size-6" />
                </div>
                <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                  <span className="text-sm font-semibold text-primary">Step {i + 1}</span>
                </div>
                <h3 className="mt-1 font-heading text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Five styles, one upload
          </h2>
          <p className="mt-4 text-muted-foreground">
            Generate any combination of looks and pick your favorites.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {styles.map((s) => (
            <div key={s.name} className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-square overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={`${s.name} headshot example`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-medium">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple credit packages
            </h2>
            <p className="mt-4 text-muted-foreground">
              Buy credits once, use them on any style. No subscriptions.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border bg-background p-6 ${
                  p.popular ? "border-primary ring-1 ring-primary" : "border-border"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-medium">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-semibold">${p.price}</span>
                </div>
                <div className="mt-2 text-sm text-foreground">
                  {p.credits}
                  {p.bonus > 0 && <span className="text-primary"> + {p.bonus} bonus</span>} credits
                </div>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" /> {p.credits + p.bonus} total credits
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" /> All 5 styles
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-4 text-primary" /> High-resolution output
                  </li>
                </ul>
                <Link href={isAuthed ? "/dashboard/user/credits" : "/auth/register"} className="mt-6">
                  <Button className="w-full" variant={p.popular ? "default" : "outline"}>
                    {isAuthed ? "Buy credits" : "Get started"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 max-w-md rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready for your new headshots?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Create an account and generate your first set of professional headshots today.
            </p>
            <Link href={primaryHref} className="mt-8 inline-block">
              <Button size="lg" className="h-12 gap-2 px-6 text-base">
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-heading font-semibold text-foreground">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-3.5" />
            </span>
            Headshot<span className="text-primary">Pro</span>
          </div>
          <p>© {year} HeadshotPro. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="transition-colors hover:text-foreground">Log in</Link>
            <Link href="/auth/register" className="transition-colors hover:text-foreground">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
