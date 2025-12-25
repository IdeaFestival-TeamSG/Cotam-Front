"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  {
    id: "home",
    href: "/",
    icon: "/mainLogoNav.svg",
    clickedIcon: "/clickedMainLogoNav.svg",
  },
  {
    id: "search",
    href: "/problem",
    icon: "/problemLogoNav.svg",
    clickedIcon: "/clickedProblemLogoNav.svg",
  },
  {
    id: "settings",
    href: "/ranking",
    icon: "/rankingLogoNav.svg",
    clickedIcon: "/clickedRankingLogoNav.svg",
  },
  {
    id: "profile",
    href: "/profile",
    icon: "/profileLogoNav.svg",
    clickedIcon: "/clickedProfileLogoNav.svg",
  },
];

const SideNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeHref, setActiveHref] = useState(pathname);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setActiveHref(pathname);
    setIsNavigating(false);
  }, [pathname]);

  const handleClick = (href: string) => {
    if (isNavigating) return;
    if (href === pathname) return;

    setIsNavigating(true);
    setActiveHref(href);

    setTimeout(() => {
      router.push(href);
    }, 80);
  };

  return (
    <nav className="pl-60 h-screen flex justify-center items-center">
      <div
        className={`relative flex flex-col justify-between items-center rounded-[3rem] py-2 w-16 h-152.5
        bg-[linear-gradient(180deg,#000_0%,#113225_32.94%,#143B2C_56.55%,#297959_85.58%,#36A177_96.67%,#46CF99_100%)]
        ${isNavigating ? "pointer-events-none" : ""}`}
      >
        {NAV_ITEMS.map((item) => {
          const active = activeHref === item.href;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.href)}
              className="relative w-12 h-12 flex items-center justify-center"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute w-10 h-10 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isMoving ? 1 : 0,
                    backgroundColor: isMoving ? "#ffffff" : "transparent",
                  }}
                  transition={{
                    duration: 0.15,
                    ease: "easeOut",
                  }}
                  onLayoutAnimationStart={() => setIsMoving(true)}
                  onLayoutAnimationComplete={() => setIsMoving(false)}
                />
              )}
              {active ? (
                <img src={item.clickedIcon} alt={item.id} />
              ) : (
                <img src={item.icon} alt={item.id} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNavBar;
