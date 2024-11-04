import {
  HomeIcon,
  PencilSquareIcon,
  ChatBubbleBottomCenterIcon,
  EnvelopeIcon,
  CogIcon,
  AdjustmentsVerticalIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavLinks() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const sidebarLinks = [
    { name: "Home", href: "/home", icon: HomeIcon },
    {
      // name: "Manager",
      name: "Manage Trips",
      href: "/dashboard/manager",
      icon: PencilSquareIcon,
      role: "manager",
    },
    {
      name: "Manage Users",
      href: "/dashboard/manager/managing-users",
      icon: AdjustmentsVerticalIcon,
      role: "manager",
    },
    {
      // name: "Passenger",
      name: "Trips",
      href: "/dashboard/passenger",
      icon: ChatBubbleBottomCenterIcon,
      role: "passenger",
    },
    {
      name: "Service Request",
      href: "/dashboard/passenger/service-request",
      icon: EnvelopeIcon,
      role: "passenger",
    },
    {
      name: "Driver Trips",
      href: "/dashboard/driver",
      icon: CogIcon,
      role: "driver",
    },
  ];
  // Filter links based on the user role, memoized to avoid recalculating
  const filteredLinks = useMemo(() => {
    return sidebarLinks.filter((link) => link.role === userRole || !link.role);
  }, [userRole]);

  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  return (
    <>
      {filteredLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            onClick={() => {
              navigate(link.href);
            }}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-black text-white p-3 text-sm font-medium hover:bg-white hover:text-black md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-red-500 text-black": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
