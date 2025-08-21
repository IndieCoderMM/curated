"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type AuthErrorType = "AccessDenied" | "Verification" | "Default" | string;

export default function AuthErrorPage() {
  const search = useSearchParams();
  const errorParam = (search.get("error") || "Default") as AuthErrorType;

  const { title, message } = useMemo(() => {
    switch (errorParam) {
      case "AccessDenied":
        return {
          title: "Access denied",
          message:
            "You don't have permission to sign in. This can happen if access was restricted in the signIn or redirect callback.",
        } as const;
      case "Verification":
        return {
          title: "Verification error",
          message:
            "Your email verification link is invalid or has expired. Request a new link and try again.",
        } as const;
      default:
        return {
          title: "Authentication error",
          message:
            "Something went wrong during authentication. Please try again or report the issue.",
        } as const;
    }
  }, [errorParam]);

  const issueUrl = useMemo(() => {
    const title = encodeURIComponent(`Auth error: ${errorParam}`);
    const body = encodeURIComponent(
      `Describe what you were doing when this happened.\n\nError: ${errorParam}\n\nSteps to reproduce:\n1. ...\n2. ...\n3. ...`,
    );
    return `https://github.com/IndieCoderMM/curated/issues/new?title=${title}&body=${body}`;
  }, [errorParam]);

  return (
    <main className="flex min-h-[80vh] w-full items-center justify-center px-4 py-10">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-sm text-muted-foreground">
            Error code:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              {errorParam}
            </code>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">Go to homepage</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={issueUrl} target="_blank" rel="noopener noreferrer">
                Report on GitHub
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
