import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ThemeSwitch } from "../themeSwitcher";
import { SunFilledIcon } from "../icons/sun-filled";
import { SearchIcon } from "../icons/search-icon";
import styles from "./header.module.css";

export default function Header() {
  {
    return (
      <Navbar className="bg-background/100" isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4"></NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3">
            <NavbarItem>
              <Link className="text-secondary-500 font-semibold" href="/">
                My magic collection
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <ThemeSwitch></ThemeSwitch>

          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </NavbarContent>
      </Navbar>
    );
  }
}
