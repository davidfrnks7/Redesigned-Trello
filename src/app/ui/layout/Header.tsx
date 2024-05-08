"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import {
  Heading,
  HStack,
  Box,
  IconButton,
  Menu,
  MenuButton
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { createProject } from "@/app/lib/redux/features/projects/projectsSlice";

const Header: React.FC = () => {
  const appName = "TaskFlow";

  const pathname = usePathname();

  const project: Project = useAppSelector(state => state.project);
  const dispatch = useAppDispatch();

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

  // ! Remove this code when linking to the DB!

  if (pathname !== null) {
    if (pathname.split("/")[1] === "projects" && project.title.length === 0) {
      dispatch(createProject(pathname.split("/")[2].replaceAll("-", " ")));
    }
  }

  return (
    <Box
      as="header"
      display="flex"
      alignItems="center"
      alignContent="space-between"
      pos="fixed"
      top="0"
      h={12}
      w="100%"
      px={4}
      zIndex={1000000}
      boxShadow="rgba(0, 134, 255, 0.75) 0px 0px 15px, rgba(0, 134, 255, 0.5) 0px 0px 3px 1px"
      bg="rgba(49, 56, 220, 0.9)"
      borderRadius="0px 0px 10px 10px"
      _hover={{
        bg: "brand.main"
      }}
    >
      {/* Logo | Site Name */}
      <Box w="100%" m="auto">
        <Heading as="h1" fontSize="xl">
          {appName}
        </Heading>
      </Box>

      {pathname?.split("/")[1] === "projects" ? (
        <Heading textAlign="center" w="100%" as="h2" fontSize="2xl">
          {project.title.length > 0 ? project.title : ""}
        </Heading>
      ) : undefined}

      {/* Desktop Nav Items and Mobile Menu Button */}
      <HStack w="100%" h="auto" alignItems="center" justifyContent="flex-end">
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
    </Box>
  );
};

export default Header;
