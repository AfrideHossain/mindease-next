"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

export default function InputField({ register, name }) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  return (
    <>
      <InputGroup>
        <InputGroupInput
          id={name}
          type={isEyeOpen ? "text" : "password"}
          required
          {...register(name)}
        />
        <InputGroupAddon align="inline-end">
          <div
            className="cursor-pointer p-px"
            onClick={() => {
              setIsEyeOpen((prev) => !prev);
            }}
          >
            {isEyeOpen ? <EyeIcon /> : <EyeClosed />}
          </div>
        </InputGroupAddon>
      </InputGroup>
      {/* <Input id="password" type="password" required {...register("password")} /> */}
    </>
  );
}
