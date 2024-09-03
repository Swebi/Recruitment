import { SignIn } from "@clerk/nextjs";
import React from "react";
import { Suspense } from "react";
export default function Page() {
  return (
    <div className="w-full h-full pt-36 flex flex-col justify-center items-center  ">
      <SignIn />
    </div>
  );
}
