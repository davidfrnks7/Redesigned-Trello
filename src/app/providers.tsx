"use client";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./ui/AppTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={AppTheme}>{children}</ChakraProvider>;
}
