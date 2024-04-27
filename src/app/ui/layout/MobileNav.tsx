import React, { FC } from "react";
import Link from "next/link";
import { MenuItem, MenuList } from "@chakra-ui/react";
import navItems, { NavItem } from "./navItems";

const MobileNav: FC<unknown> = () => {
  return (
    <MenuList
      as="nav"
      display={{ base: "block", lg: "none" }}
      bg="brand.main"
      h="auto"
      w="100%"
      p={0}
      border="none"
      boxShadow="none"
    >
      {navItems.map((navItem: NavItem) => {
        return (
          <MenuItem
            as={Link}
            href={navItem[1]}
            id={"mobile-" + navItem[0]}
            key={"mobile-" + navItem[0]}
            w="100vw"
            h="50px"
            textAlign="center"
          >
            {navItem[0]}
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default MobileNav;
