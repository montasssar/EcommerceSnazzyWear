"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== "montassar579@gmail.com") {
        router.replace("/");
      }
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="p-4 text-center text-gray-600">Loading...</p>;
  }

  return <>{children}</>;
}
