"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MdOutlineDashboard, MdOutlineAnalytics, MdOutlineInventory, MdOutlineReport, MdOutlineSettings } from "react-icons/md";
import Image from "next/image";
import StudentCard from "./ui/StudentCard";
import { useRouter } from 'next/navigation';

export function Admin() {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        console.error('Logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const [activeSection, setActiveSection] = useState("BUTANE");

  const links = [
    {
      label: "BUTANE",
      href: "#",
      icon: <MdOutlineDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => setActiveSection("BUTANE"), 
    },
    {
      label: "PENTANE",
      href: "#",
      icon: <MdOutlineAnalytics className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => setActiveSection("PENTANE"),
    },
    {
      label: "METHANE",
      href: "#",
      icon: <MdOutlineInventory className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => setActiveSection("METHANE"),
    },
    {
      label: "ETHANE",
      href: "#",
      icon: <MdOutlineReport className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => setActiveSection("ETHANE"),
    },
    {
      label: "PROPANE",
      href: "#",
      icon: <MdOutlineSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      onClick: () => setActiveSection("PROPANE"),
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={activeSection === link.label ? "bg-black-pearl-600  px-1 rounded-md" : ""}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'LOG OUT',
                href: '#',
                icon: (
                  <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
                onClick: handleLogout,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard activeSection={activeSection} />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <Image src="/MAAP.svg" height={40} width={40} alt="logo" />
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
      <Image src="/MAAP.svg" height={20} width={20} alt="logo" />
    </a>
  );
};

const Dashboard = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="flex flex-1 flex-col p-6 overflow-auto bg-white ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        {activeSection === "BUTANE" && (
          <div className="">
            <StudentCard text="Butane"/>
          </div>
        )}
        {activeSection === "PENTANE" && (
          <div className="">
            <StudentCard text="Pentane"/>
          </div>
        )}
        {activeSection === "METHANE" && (
          <div className="">
            <StudentCard text="Methane"/>
          </div>
        )}
        {activeSection === "ETHANE" && (
          <div className="">
            <StudentCard text="Ethane"/>
          </div>
        )}
        {activeSection === "PROPANE" && (
          <div className="">
            <StudentCard text="Propane"/>
          </div>
        )}
      </motion.div>
    </div>
  );
};