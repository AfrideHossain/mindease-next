"use client";

import React, { useEffect, useRef } from "react";
import { makeStore } from "../store";
import { Provider } from "react-redux";
import { setUser } from "../../features/userSession/authInfoSlice";

export default function ReduxStoreProvider({
  children,
  initialSessionUserInfo,
}) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  //   useEffect(() => {
  //     if (initialSessionUserInfo && storeRef.current) {
  //       storeRef.current.dispatch(setUser(initialSessionUserInfo));
  //     }
  //   }, [initialSessionUserInfo]);
  return <Provider store={storeRef.current}>{children}</Provider>;
}
