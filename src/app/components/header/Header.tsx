import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import Zenodropdown from "../navigation/Zenodropdown";
import ZenodropdownMobile from "../navigation/ZenodropdownMobile";
import NewChat from "./NewChat";

const Header = () => {
  return (
    <div className="flex items-center justify-center m-2.5 h-10 w-full px-4">
      <NewChat />
      <div className="flex-1 pl-2 flex justify-center md:justify-between">
        <Zenodropdown className="text-lg max-md:hidden text-slate-500 bg-bgPrimary" />
        <ZenodropdownMobile className="text-lg max-md:visible md:hidden text-slate-500 bg-bgPrimary" />
      </div>
      <div className="max-w-42 flex items-center justify-between m-2.5">
        <Button asChild className="mr-2.5">
          <Link href="#">Login</Link>
        </Button>
        <Button asChild variant="outline" className="hidden md:flex ">
          <Link href="#">Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
