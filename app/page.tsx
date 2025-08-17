import { auth } from "@/auth";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCapIcon, TrendingUpIcon, Users2Icon } from "lucide-react";
import Link from "next/link";

export default async function LandingPage() {
  const session = await auth();

  return (
    <main className="h-screen bg-gradient-to-b from-background to-muted/30 text-foreground">
      {/* Navbar */}
      <header className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          {session ? (
            <Link href="/dashboard">
              <Button variant="outline">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 pb-24 pt-8 md:grid-cols-2 lg:pt-10">
        <div className="flex flex-col gap-6">
          <Badge className="w-fit" variant="outline">
            Community-driven learning
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Learn anything with curated, trackable video courses
          </h1>
          <p className="max-w-prose text-muted-foreground">
            CuratEd is an education-focused version of YouTube playlists. Create
            and share courses from YouTube links, track your progress, and learn
            together with the community.
          </p>
          {session ? (
            <Link href="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button size="lg">Get started free</Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline">
                  Browse Available Courses
                </Button>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 rounded-md p-2">
              <TrendingUpIcon className="h-6 w-6 text-emerald-500" />
              <span className="text-emerald-500">Track progress</span>
            </div>
            <div className="flex items-center gap-1 rounded-md p-2">
              <GraduationCapIcon className="h-6 w-6 text-blue-500" />
              <span className="text-blue-500">Create courses</span>
            </div>
            <div className="flex items-center gap-1 rounded-md p-2">
              <Users2Icon className="h-5 w-5 text-purple-500" />
              <span className="text-purple-500">Built by community</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-primary/10 blur-2xl" />
          <div className="rounded-xl border bg-card p-3 shadow-xl">
            <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="h-16 rounded-md border bg-background" />
              <div className="h-16 rounded-md border bg-background" />
              <div className="h-16 rounded-md border bg-background" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
