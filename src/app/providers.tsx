"use client";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./ui/AppTheme";
import StoreProvider from "./lib/redux/StoreProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={AppTheme}>
      <StoreProvider>{children}</StoreProvider>
    </ChakraProvider>
  );
}
