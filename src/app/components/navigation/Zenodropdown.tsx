"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import NavItemLink from "../navigation/NavItemLink";

type NavItem = {
  href: string;
  title: string;
};

const Zenodropdown = ({ ...props }) => {
  const navItems: NavItem[] = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/report", title: "Report" },
    { href: "/newfeature", title: "Request Feature" },
  ];

  return (
    <NavigationMenu orientation="vertical" {...props}>
      <NavigationMenuList {...props}>
        <NavigationMenuItem {...props}>
          <NavigationMenuTrigger className="NavigationMenuTrigger" {...props}>
            Zeno
          </NavigationMenuTrigger>
          <NavigationMenuContent {...props} className="NavigationMenuContent">
            {navItems.map(({ href, title }, index) => (
              <NavItemLink
                key={index}
                href={href}
                item={title}
                {...props}
                className="NavigationMenuLink"
              />
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator className="NavigationMenuIndicator" />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Zenodropdown;
