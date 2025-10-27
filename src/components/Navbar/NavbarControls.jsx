"use client";

import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import NavUser from "./NavUser";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { useAppSelector } from "@/lib/redux/hooks/hooks";

export default function NavbarControls() {
  const { user, status } = useAppSelector((state) => state.authInfo);

  // console.log("--[NavbarControls] log--", { user, status });
  return (
    <div className="flex gap-4 items-center">
      <ToggleDarkMode />
      {user && <LogoutBtn />}
      {!user && (
        <Button asChild>
          <Link href={"/login"}>
            <LogInIcon />
          </Link>
        </Button>
      )}
      {user && <NavUser user={user} />}
    </div>
  );
}
