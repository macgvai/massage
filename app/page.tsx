'use client'
import {Button} from "@heroui/react";
import React from "react";
import Services from "@/components/services";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
        <Services />
    </div>
  );
}
