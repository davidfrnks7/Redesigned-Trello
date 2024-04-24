import React, { FC } from "react";
import { Button, HStack, Link } from "@chakra-ui/react";
import navItems, { NavItem } from "./navItems";

const DesktopNav: FC<unknown> = () => {
  return (
    <HStack
      as="nav"
      display={{ base: "none", lg: "flex" }}
      h="auto"
      w="auto"
      spacing={4}
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      {navItems.map((navItem: NavItem) => {
        return (
          <Link href={navItem[1]} key={"dekstop-" + navItem[0]}>
            <Button id={"dekstop-" + navItem[0]} variant="stickyNav" color="">
              {navItem[0]}
            </Button>
          </Link>
        );
      })}
    </HStack>
  );
};

export default DesktopNav;
