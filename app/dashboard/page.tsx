"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { logOut } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show spinner for 3 seconds on fresh login
  useEffect(() => {
    const isNewLogin = searchParams.get("welcome") === "true";
    if (isNewLogin) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
        // Remove the query param from URL
        router.replace("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(false);
    }
  }, [searchParams, router]);

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  if (loading || showSpinner) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Spinner className="size-8 text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">GetHired</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to GetHired! Your job tracking dashboard will be here.
        </p>
      </main>
    </div>
  );
}
