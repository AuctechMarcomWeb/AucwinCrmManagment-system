import { createContext, useContext, useEffect, useState } from "react";
import { TOKEN_KEY } from "@/constants";

const AuthContext = createContext(null);

function getStoredToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
function saveToken(token) {
  try {
    token
      ? localStorage.setItem(TOKEN_KEY, token)
      : localStorage.removeItem(TOKEN_KEY);
  } catch { /* storage unavailable */ }
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getStoredToken());
  const [profile, setProfile]  = useState(null);
  const [loading, setLoading]  = useState(true);

  // Persist token and broadcast changes
  function applyToken(t) {
    saveToken(t);
    setTokenState(t);
    if (!t) setProfile(null);
  }

  useEffect(() => {
    (async () => {
      if (getStoredToken()) {
        // Replace this fetch with your real getMe() call
        try {
          // const user = await getMe();
          // setProfile(user);

          // ── MOCK PROFILE (remove once backend is live) ──
          setProfile({
            id: "platform-admin-1",
            full_name: "Platform Admin",
            email: "admin@aucwin.com",
            role: "platform_admin",
          });
        } catch (e) {
          if (e?.status === 401) applyToken(null);
        }
      }
      setLoading(false);
    })();
  }, []);

  const value = {
    token,
    profile,
    loading,
    session: !!token,
    isPlatformAdmin: profile?.role === "platform_admin",
    isSuperAdmin:
      profile?.role === "super_admin" || profile?.role === "platform_admin",

    async signIn(email, password) {
      try {
        // const res = await login(email, password);
        // setProfile(res.user);
        // applyToken(res.token);

        // ── MOCK LOGIN (remove once backend is live) ──
        if (email === "admin@aucwin.com" && password === "admin123") {
          const mockToken = "mock-platform-token-" + Date.now();
          applyToken(mockToken);
          setProfile({
            id: "platform-admin-1",
            full_name: "Platform Admin",
            email,
            role: "platform_admin",
          });
          return null;
        }
        return "Invalid credentials";
      } catch (e) {
        return e?.message ?? "Sign-in failed";
      }
    },

    async signOut() {
      applyToken(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
