import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center md:w-3xl mb-4">
        <h1 className="text-5xl font-bold leading-normal">MindEase</h1>
        <p className="leading-normal">
          MindEase is a small, real-world mental wellness web app designed for
          users to express emotions, journal thoughts, and visualize mood
          patterns over time. It aims to provide emotional relief through a
          minimalistic and anonymous journaling experience.
        </p>
      </div>
      <Button className={"capitalize"}>Login/Get started</Button>
    </section>
  );
}
