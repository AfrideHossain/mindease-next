import { auth } from "@/auth";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import { NavMenu } from "../NavigationMenu/NavMenu";
import NavUser from "./NavUser";

export default async function Navbar() {
  const session = await auth();
  console.log("Session from navbar component=> ", session);

  return (
    <nav className="container mx-auto bg-background px-4 md:px-0 h-16 flex items-center">
      <div className="flex-1 flex justify-between">
        <Link href={"/"} className="">
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
            MindEase
          </h1>
        </Link>
        <div>
          <NavMenu />
        </div>
        <div className="flex gap-4 items-center">
          <ToggleDarkMode />
          {session?.user ? (
            <LogoutBtn />
          ) : (
            <Button asChild>
              <Link href={"/login"}>
                <LogInIcon />
              </Link>
            </Button>
          )}
          <NavUser user={session?.user} />
        </div>
      </div>
    </nav>
  );
}
