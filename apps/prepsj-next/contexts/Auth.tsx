import { getMe } from "@/apis/user";
import { useRouter } from "next/router";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface Props {
  user: Awaited<ReturnType<typeof getMe>> | null;
  token: string | null;
}

const _AuthContext = createContext<Props | null>(null);
const { Provider } = _AuthContext;

export function AuthContext({
  whitelist,
  children,
}: PropsWithChildren<{ whitelist: string[] }>) {
  const router = useRouter();
  const [user, setUser] = useState<Awaited<ReturnType<typeof getMe>> | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      return;
    }
    const currentPath = router.pathname;
    if (whitelist.includes(currentPath)) return;
    router.push("/login");
  }, [router, whitelist]);

  useEffect(() => {
    if (!token) return;
    getMe(token)
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [token, router]);

  return <Provider value={{ user, token }}>{children}</Provider>;
}
