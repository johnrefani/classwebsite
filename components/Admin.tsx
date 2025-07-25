"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MdOutlinePerson2 } from "react-icons/md";
import Image from "next/image";
import StudentCard from "./ui/StudentCard";
import Button from "./ui/Button";

export function Admin() {
  const links = [
    {
      label: "BUTANE",
      href: "#",
      icon: (
        <MdOutlinePerson2 className=" h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "PENTANE",
      href: "#",
      icon: (
        <MdOutlinePerson2  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "METHANE",
      href: "#",
      icon: (
        <MdOutlinePerson2  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "ETHANE",
      href: "#",
      icon: (
        <MdOutlinePerson2  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "PROPANE",
      href: "#",
      icon: (
        <MdOutlinePerson2  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "LOG OUT",
                href: "#",
                icon: (
                  <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <Image src="./MAAP.svg" height={40} width={40} alt="logo"/>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        
      >
        MAAP HERZIVANES
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src="./MAAP.svg" height={20} width={20} alt="logo"/>
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full  gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10">
        <div>
            <StudentCard text="BUTANE"/>
        </div>
        
        <div className="grid grid-rows-3">
           <Button text="ADD STUDENT" className="bg-blue-500"/>
            <Button text="EDIT STUDENT" className="bg-green-500"/>
            <Button text="DELETE STUDENT" className="bg-red-500"/>
        </div>

      </div>
    </div>
  );
};
