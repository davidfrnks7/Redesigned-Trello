"use client";
import React, { useState } from "react";
import {
  Heading,
  HStack,
  Box,
  IconButton,
  Flex,
  Menu,
  MenuButton
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header: React.FC = () => {
  const appName = "Redesigned Trello";

  // Mobile Menu Icon && Open/Close
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const menuIcon = (): JSX.Element => {

    const iconType = {
      default: <Icon icon="bx:bx-menu-alt-right" />,
      hover: <Icon icon="bx:bx-menu" />,
      open: <Icon icon="bx:bx-x" />
    };

    if (open) {
      return iconType.open;
    } else if (hover) {
      return iconType.hover;
    } else {
      return iconType.default;
    }
  };

  return (
    <Box
      as="header"
      zIndex={1000000}
      w="100%"
      pos="fixed"
      top="0"
      alignItems={"center"}
      boxShadow="rgba(0, 134, 255, 0.75) 0px 0px 15px, rgba(0, 134, 255, 0.5) 0px 0px 3px 1px"
      bg="rgba(49, 56, 220, 0.9)"
      borderRadius="0px 0px 10px 10px"
      _hover={{
        bg: "brand.main"
      }}
      h="auto"
    >
      {/* Logo | Site Name */}
      <Flex
        width="100%"
        justifyContent={{ base: "flex-start", sm: "center" }}
        alignItems="center"
        height={12}
        top={0}
        position="absolute"
        ml={4}
        display={{ base: "flex", lg: "none" }}
      >
        <Heading as="h1" fontSize="lg">
          {appName}
        </Heading>
      </Flex>

      {/* Desktop Nav Items and Mobile Menu Button */}
      <HStack
        w="100%"
        px={4}
        h={12}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack
          w="100%"
          h="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box w="100%" display={{ base: "none", lg: "flex" }} m="auto">
            <Heading as="h1" size="md">
              {appName}
            </Heading>
          </Box>
          <DesktopNav />
        </HStack>
        <Menu isLazy lazyBehavior="unmount" isOpen={open}>
          <MenuButton
            as={IconButton}
            aria-label="Mobile Menu"
            icon={menuIcon()}
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            display={{ base: "inline-flex", lg: "none" }}
            variant="mobileNav"
            bg="rgba(255, 255, 255, .15)"
            type="button"
            border="1px solid #0068ff"
            id="mobile-menu-button"
          />
          <MobileNav />
        </Menu>
      </HStack>
    </Box>
  );
};

export default Header;
