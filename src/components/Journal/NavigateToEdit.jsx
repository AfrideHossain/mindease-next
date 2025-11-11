"use click";

import { useRouter } from "next/navigation";
import { PenBoxIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function NavigateToEdit({ originPath }) {
  const router = useRouter();

  const handleOnClick = (e) => {
    e.stopPropagation();
    router.push(`${originPath}/edit`);
  };
  return (
    <>
      <Button
        variant={"outline"}
        className={"cursor-pointer"}
        onClick={handleOnClick}
      >
        <PenBoxIcon />
      </Button>
    </>
  );
}
