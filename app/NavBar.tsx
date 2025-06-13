"use client";
import { Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex align="center" gap="3">
          <NavLinks />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "Workspace", href: "/workspace" },
    { label: "Transactions", href: "/transactions" },
  ];
  return (
    <ul className="flex space-x-10">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames("nav-link", {
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
