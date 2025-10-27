"use client";

import { SessionProvider } from "next-auth/react";
import ReduxStoreProvider from "@/lib/redux/store/provider/ReduxStoreProvider";
import SessionSyncProvider from "./SessionSyncProvider";
export default function Providers({ children }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ReduxStoreProvider>
        <SessionSyncProvider>{children}</SessionSyncProvider>
      </ReduxStoreProvider>
    </SessionProvider>
  );
}
