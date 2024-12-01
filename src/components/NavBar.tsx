"use client";
import React from "react";
import useTheme from "@/app/hooks/useTheme";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import UserButton from "./UserButton";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { ShoppingOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation"; // Import du hook pour obtenir le chemin actuel

export default function Header() {
  const session = useSession();
  const user = session.data?.user;
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname(); // Récupère le chemin actuel

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Devis", href: "/devis" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarBrand>
        <Image
          src="/3D.svg"
          width={50}
          height={50}
          alt="Platform Logo"
          priority
        />
        <p className="font-bold text-inherit">3D Printing Online</p>
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {/* <NavbarBrand>
          <Image
            src="/3D.svg"
            width={50}
            height={50}
            alt="Platform Logo"
            priority
          />
          <p className="font-bold text-inherit">3D Printing Online</p>
        </NavbarBrand> */}
        {menuItems.map((item) => (
          <NavbarItem key={item.name} isActive={pathname === item.href}>
            <Link href={item.href} passHref>
              <span
                style={{
                  color: pathname === item.href ? "foreground" : "inherit",
                }}
              >
                {item.name}
              </span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {/* <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-md bg-gray-200 p-2 
                       text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 
                       dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button> */}
          <Button
            isIconOnly
            variant="faded"
            aria-label="Toggle Theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Link href="/panier">
            <ShoppingOutlined />
          </Link>
        </NavbarItem>
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.name || "User"}
                size="sm"
                src={user?.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as {user?.name}</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            {/* Bouton utilisateur ou connexion */}
            {session.status !== "loading" && <SignInButton />}
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link href={item.href} passHref>
              <span
                style={{
                  color: pathname === item.href ? "foreground" : "inherit",
                  width: "100%",
                }}
              >
                {item.name}
              </span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

function SignInButton() {
  return (
    <Button onClick={() => signIn()} className="px-4 py-2">
      Sign in
    </Button>
  );
}