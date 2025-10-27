"use client";

import { logoutUser } from "@/app/actions/authenticationAction";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks/hooks";
import { clearUser } from "@/lib/redux/features/userSession/authInfoSlice";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const res = await logoutUser();
      if (res?.success) {
        dispatch(clearUser());
        router.push("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <>
      <Button onClick={handleLogOut}>
        <LogOutIcon />
      </Button>
    </>
  );
}
