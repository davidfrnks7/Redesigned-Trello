import React, { FC } from "react";
import { Button, HStack } from "@chakra-ui/react";
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
          <Button
            id={"dekstop-" + navItem[0]}
            key={navItem[0]}
            variant="nav"
            color="#00aec1"
            border="solid #00aec1"
            borderWidth="0px 0px 2px 0px"
            borderRadius={8}
          >
            {navItem[0]}
          </Button>
        );
      })}
    </HStack>
  );
};

export default DesktopNav;
