"use client";

import {
  clearUser,
  setUser,
} from "@/lib/redux/features/userSession/authInfoSlice";
import { useAppDispatch } from "@/lib/redux/hooks/hooks";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionSyncProvider({ children }) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(setUser(session.user));
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [status, session, dispatch]);
  return children;
}
