import React from "react";
import logo from "@/assets/logog.svg";
import logonew from "@/assets/logonew.svg";
import whatsapp from "@/assets/wa.svg";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between items-center bg-black h-16 px-10 py-10">
      <Link href="/">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={logonew}
            alt=""
            height={0}
            width={0}
            className="h-10 w-10"
          />
          <h1 className="text-white font-bold text-xl">dBug Labs</h1>
        </div>
      </Link>
      <Link href="https://chat.whatsapp.com/FMAMZoWoHUV23fTTFeNYB4">
        <Image src={whatsapp} alt="" height={0} width={0} className="h-8 w-8" />
      </Link>
    </div>
  );
};

export default Navbar;
