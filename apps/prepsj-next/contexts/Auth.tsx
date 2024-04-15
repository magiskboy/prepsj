"use client";

import { getMe } from "@/apis/user";
import { usePathname, useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  user: Awaited<ReturnType<typeof getMe>> | null;
}

const _AuthContext = createContext<Props | null>(null);
_AuthContext.displayName = "AuthProvider";

export function AuthProvider({
  whitelist,
  children,
}: PropsWithChildren<{ whitelist: string[] }>) {
  const router = useRouter();
  const [user, setUser] = useState<Awaited<ReturnType<typeof getMe>> | null>(
    null
  );
  const path = usePathname();

  useEffect(() => {
    getMe()
      .then((user) => {
        setUser(user);
      })
      .catch(() => setUser(null));
  }, [router]);

  useEffect(() => {
    if (path && whitelist.includes(path)) return;

    if (!user) {
      router.push("/login");
    }
  }, [user, whitelist, router, path]);

  return (
    <_AuthContext.Provider value={{ user }}>{children}</_AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(_AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
