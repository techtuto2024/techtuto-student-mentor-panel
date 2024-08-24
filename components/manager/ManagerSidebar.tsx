"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { ModeSwitch } from "@/components/utils/ModeSwitch";

const menuItems = [
  {
    name: "Home",
    icon: "fa fa-home",
    route: "/manager",
  },
  {
    name: "My Batches",
    icon: "fa-solid fa-layer-group",
    route: "/manager/batches",
  },
  {
    name: "Settings",
    icon: "fa fa-gear",
    route: "/manager/settings",
  },
];

const ManagerSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-10 items-start">
      <div className="flex flex-row items-center justify-between">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image
            src="/images/techtuto-logo.png"
            alt="TechTuto"
            height={100}
            width={40}
          />
          <p className="text-2xl font-bold dark:text-white">TechTuto</p>
        </Link>
        <ModeSwitch />
      </div>
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.route}
            className={`flex w-64 flex-row items-center gap-4 text-lg p-3 hover:bg-violet-500 hover:text-white dark:text-white hover:font-semibold dark:hover:text-black rounded-2xl ${
              pathname === item.route ? "bg-violet-500 text-white font-semibold dark:text-black" : ""
            }`}
          >
            <i className={`${item.icon} text-2xl w-8`} aria-hidden="true"></i>
            <p className="">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManagerSidebar;
