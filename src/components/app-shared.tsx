import type { ReactNode } from "react";
import {
  LayoutGridIcon,
  ReceiptIcon,
  UtensilsIcon,
  TableIcon,
  UsersIcon,
  UserSquareIcon,
  HelpCircleIcon,
  BookOpenIcon,
  ClipboardListIcon,
} from "lucide-react";
import { usePathnameActive } from "@/hooks/use-pathname-active";

export type SidebarNavItem = {
  title: string;
  path?: string;
  icon?: ReactNode;
  isActive?: boolean;
  subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
  label?: string;
  items: SidebarNavItem[];
};

export const navGroups: SidebarNavGroup[] = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        path: "/",
        icon: <LayoutGridIcon />,
      },
      {
        title: "Transaksi",
        path: "/transaksi",
        icon: <ReceiptIcon />,
      },
    ],
  },
  {
    label: "Master Data",
    items: [
      {
        title: "Menu",
        path: "/menu",
        icon: <UtensilsIcon />,
      },
      {
        title: "Meja",
        path: "/meja",
        icon: <TableIcon />,
      },
      {
        title: "Pelanggan",
        path: "/pelanggan",
        icon: <UsersIcon />,
      },
      {
        title: "Kasir",
        path: "/kasir",
        icon: <UserSquareIcon />,
      },
    ],
  },
];

export const footerNavLinks: SidebarNavItem[] = [];

export const navLinks: SidebarNavItem[] = [
  ...navGroups.flatMap((group) =>
    group.items.flatMap((item) =>
      item.subItems?.length ? [item, ...item.subItems] : [item],
    ),
  ),
  ...footerNavLinks,
];
