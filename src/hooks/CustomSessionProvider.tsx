
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserType = "etudiant" | "recruteur";
export interface CustomSession {
  id: string;
  nom: string;
  email: string;
  userType: UserType;
}

type CustomSessionContextType = {
  session: CustomSession | null;
  loginSession: (sess: CustomSession) => void;
  logoutSession: () => void;
};

const CustomSessionContext = createContext<CustomSessionContextType | undefined>(undefined);

export function CustomSessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<CustomSession | null>(null);

  useEffect(() => {
    // Debug ONLY: pour tracker les montages multiples inattendus
    console.log("[CustomSessionProvider] MOUNT");
    const data = localStorage.getItem("customSession");
    if (data) {
      try {
        const parsed: CustomSession = JSON.parse(data);
        setSession(parsed);
      } catch {
        setSession(null);
        localStorage.removeItem("customSession");
      }
    }
  }, []);

  function loginSession(sess: CustomSession) {
    setSession(sess);
    localStorage.setItem("customSession", JSON.stringify(sess));
  }

  function logoutSession() {
    setSession(null);
    localStorage.removeItem("customSession");
  }

  return (
    <CustomSessionContext.Provider value={{ session, loginSession, logoutSession }}>
      {children}
    </CustomSessionContext.Provider>
  );
}

export function useCustomSessionContext() {
  const ctx = useContext(CustomSessionContext);
  if (!ctx) throw new Error("useCustomSessionContext must be used within a CustomSessionProvider!");
  // Debug ONLY: pour détection multicontextes
  console.log("[useCustomSession] access, session=", ctx.session);
  return ctx;
}
