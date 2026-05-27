"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/assignmentStore";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { initAuth, fetchProfile } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      initAuth();
      const storedToken =
        typeof window !== "undefined"
          ? localStorage.getItem("vedaai_token")
          : null;

      if (!storedToken) {
        router.push("/login");
        return;
      }

      await fetchProfile();
      setIsChecking(false);
    };
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <Loader2
            size={28}
            className="animate-spin text-brand-primary"
          />
          <p className="text-sm text-neutral-400">Loading VedaAI...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
