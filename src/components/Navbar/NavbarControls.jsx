import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import NavUser from "./NavUser";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { auth } from "@/auth";

export default async function NavbarControls() {
  const session = await auth();
  const user = session?.user;

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
      <NavUser user={user} />
    </div>
  );
}
