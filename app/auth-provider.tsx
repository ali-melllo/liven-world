"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/slices/userSlice";
import { usePathname } from "next/navigation";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const path = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    } else if (!userData && (path !== "/intro" && path !== "/signin" && path !== "/onboarding")) {
      window.location.href = "/intro"
    }
  }, [dispatch, path]);

  return <>{children}</>;
}
