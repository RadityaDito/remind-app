"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

export function ChakraUIProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
