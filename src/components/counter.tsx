"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <h2>Counter: {counter}</h2>
      <Button onClick={() => setCounter((c) => c + 1)}>
        Tailwind + Shadcn starter works, wahoo!
      </Button>
    </>
  );
}
