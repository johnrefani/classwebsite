"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import StudentCard from "./Card";
import { useRouter } from 'next/navigation';
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { MdOutlineEngineering } from "react-icons/md";
import { LuShipWheel } from "react-icons/lu";

export function StudentDashboard() {
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
  const [isBSMAREOpen, setIsBSMAREOpen] = useState(true); // State to toggle BSMARE sub-menu
  const [isBSMTOpen, setIsBSMTOpen] = useState(false); // State to toggle BSMT sub-menu

  const handleSubLinkClick = (section: string, parent: string) => {
    setActiveSection(section);
    if (parent === "BSMARE") {
      setIsBSMAREOpen(true);
      setIsBSMTOpen(false);
    } else if (parent === "BSMT") {
      setIsBSMAREOpen(false);
      setIsBSMTOpen(true);
    }
  };

  const links = [
    {
      label: "BSMARE",
      href: "#",
      icon: <MdOutlineEngineering className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      subLinks: [
        {
          label: "BUTANE",
          href: "#",
          onClick: () => handleSubLinkClick("BUTANE", "BSMARE"),
        },
        {
          label: "METHANE",
          href: "#",
          onClick: () => handleSubLinkClick("METHANE", "BSMARE"),
        },
        {
          label: "PENTANE",
          href: "#",
          onClick: () => handleSubLinkClick("PENTANE", "BSMARE"),
        },
        {
          label: "ETHANE",
          href: "#",
          onClick: () => handleSubLinkClick("ETHANE", "BSMARE"),
        },
        {
          label: "PROPANE",
          href: "#",
          onClick: () => handleSubLinkClick("PROPANE", "BSMARE"),
        },
      ],
      onClick: () => setIsBSMAREOpen(!isBSMAREOpen),
    },
    {
      label: "BSMT",
      href: "#",
      icon: <LuShipWheel className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      subLinks: [
        {
          label: "SHAULA",
          href: "#",
          onClick: () => handleSubLinkClick("SHAULA", "BSMT"),
        },
        {
          label: "SPICA",
          href: "#",
          onClick: () => handleSubLinkClick("SPICA", "BSMT"),
        },
        {
          label: "SCHEDAR",
          href: "#",
          onClick: () => handleSubLinkClick("SCHEDAR", "BSMT"),
        },
        {
          label: "POLLUX",
          href: "#",
          onClick: () => handleSubLinkClick("POLLUX", "BSMT"),
        },
        {
          label: "PROCYON",
          href: "#",
          onClick: () => handleSubLinkClick("PROCYON", "BSMT"),
        },
      ],
      onClick: () => setIsBSMTOpen(!isBSMTOpen),
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
                <div key={idx}>
                  <SidebarLink
                    link={{
                      ...link,
                      icon: (
                        <div className="flex items-center gap-2">
                          {link.icon}
                          {open && (
                            <motion.span
                              animate={{ rotate: link.label === "BSMARE" ? (isBSMAREOpen ? 180 : 0) : (isBSMTOpen ? 180 : 0) }}
                              transition={{ duration: 0.2 }}
                            >
                              {(link.label === "BSMARE" && isBSMAREOpen) || (link.label === "BSMT" && isBSMTOpen) ? (
                                <IconChevronUp className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                              ) : (
                                <IconChevronDown className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                              )}
                            </motion.span>
                          )}
                        </div>
                      ),
                    }}
                    className={activeSection === link.label ? "bg-black-pearl-600 px-1 rounded-md" : ""}
                  />
                  {((link.label === "BSMARE" && isBSMAREOpen) || (link.label === "BSMT" && isBSMTOpen)) && link.subLinks && open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 flex flex-col gap-2"
                    >
                      {link.subLinks.map((subLink, subIdx) => (
                        <SidebarLink
                          key={subIdx}
                          link={subLink}
                          className={activeSection === subLink.label ? "bg-black-pearl-800 px-1 rounded-md" : ""}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
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
      <Image src="/Logo.jpg" height={20} width={20} alt="logo" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        HERZIVANEANS CLASS 2028
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
      <Image src="/Logo.jpg" height={20} width={20} alt="logo" />
    </a>
  );
};

const Dashboard = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="flex flex-1 flex-col p-6 overflow-auto bg-gray-100 ">
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
        {activeSection === "SHAULA" && (
          <div className="">
            <StudentCard text="Shaula"/>
          </div>
        )}
        {activeSection === "SPICA" && (
          <div className="">
            <StudentCard text="Spica"/>
          </div>
        )}
        {activeSection === "SCHEDAR" && (
          <div className="">
            <StudentCard text="Schedar"/>
          </div>
        )}
        {activeSection === "POLLUX" && (
          <div className="">
            <StudentCard text="Pollux"/>
          </div>
        )}
        {activeSection === "PROCYON" && (
          <div className="">
            <StudentCard text="Procyon"/>
          </div>
        )}
      </motion.div>
    </div>
  );
};