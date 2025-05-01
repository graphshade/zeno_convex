"use client";
import { NavigationMenuLink } from "@/app/components/ui/navigation-menu";

import { usePathname } from "next/navigation";

import React from "react";

type NavItemLinkProp = {
  href: string;
  item: string;
} & React.ComponentProps<typeof NavigationMenuLink>;

const NavItemLink = ({ href, item, ...props }: NavItemLinkProp) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenuLink active={isActive} href={href} {...props}>
      {item}
    </NavigationMenuLink>
  );
};

export default NavItemLink;
