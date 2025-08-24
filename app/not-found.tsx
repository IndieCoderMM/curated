import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appRoutes } from "@/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            The page you&apos;re looking for does not exist.
          </CardDescription>
          <div className="mt-6 flex gap-3">
            <Link href={appRoutes.landing} className="inline-block">
              <Button variant="default">Go to Home Page</Button>
            </Link>
            <Link href={appRoutes.explore} className="inline-block">
              <Button variant="outline">Explore Courses</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
