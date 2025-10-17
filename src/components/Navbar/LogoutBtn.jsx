"use client";

import { logoutUser } from "@/app/actions/authenticationAction";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

export default function LogoutBtn({ className }) {
  const handleLogOut = async () => {
    await logoutUser();
  };
  return (
    <>
      <Button onClick={handleLogOut}>
        <LogOutIcon />
      </Button>
    </>
  );
}
