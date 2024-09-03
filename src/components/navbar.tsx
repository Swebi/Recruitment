import React from "react";
import logo from "@/assets/logog.svg";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex w-full justify-start items-center bg-black h-16 px-10 py-10">
      <Link href="/">
        <div className="flex justify-center items-center gap-2">
          <Image src={logo} alt="" height={0} width={0} className="h-10 w-10" />
          <h1 className="text-white text-xl">dBug Labs</h1>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
