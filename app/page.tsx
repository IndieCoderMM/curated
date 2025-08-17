import { auth } from "@/auth";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCapIcon, TrendingUpIcon, Users2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  const session = await auth();

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-b from-background to-muted/30 text-foreground">
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
      <section className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 pb-24 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Badge className="w-fit text-accent-foreground" variant="outline">
            Community-powered learning
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Your self-taught journey, organized and trackable
          </h1>
          <p className="max-w-prose text-lg">
            Learning online shouldn&apos;t feel scattered. With{" "}
            <span className="font-semibold text-accent-foreground">
              CuratEd
            </span>
            , you can organize educational videos into structured courses, track
            your progress as you go, and learn alongside a community that cares
            about growth.
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
              <span className="text-blue-500">Build courses</span>
            </div>
            <div className="flex items-center gap-1 rounded-md p-2">
              <Users2Icon className="h-5 w-5 text-purple-500" />
              <span className="text-purple-500">Learn with community</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/hero.png"
            alt="Hero Image"
            width={1000}
            height={800}
            className="w-full object-contain"
          />
        </div>
      </section>
    </main>
  );
}
