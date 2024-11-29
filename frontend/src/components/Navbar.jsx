"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import useAuth from "../hooks/useAuth";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  const baseNavItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
    {
      name: "Products",
      link: "#products",
      icon: <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />,
    },
    {
      name: "WholeSale",
      link: "#wholeSale",
      icon: (
        <IconMessage className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
    {
      name: "Why us",
      link: "#whyus",
      icon: (
        <IconMessage className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
    {
      name: "Blogs",
      link: "#blogs",
      icon: (
        <IconMessage className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
    {
      name: "Reviews",
      link: "#reviews",
      icon: (
        <IconMessage className='h-4 w-4 text-neutral-500 dark:text-white' />
      ),
    },
  ];

  const navItems = isAuthenticated
    ? [
        ...baseNavItems,
        {
          name: "Profile",
          link: "/profile",
          icon: (
            <IconUser className='h-4 w-4 text-neutral-500 dark:text-white' />
          ),
        },
      ]
    : baseNavItems;

  return (
    <div className='relative w-full'>
      <FloatingNav navItems={navItems} />
    </div>
  );
}
