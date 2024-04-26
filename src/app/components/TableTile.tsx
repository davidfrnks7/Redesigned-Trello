import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

const Table = (): JSX.Element => {
  return (
    <VStack
      minH="80vh"
      w="350px"
      bg="blackAlpha.800"
      justifyContent="flex-start"
      alignContent="center"
      borderRadius="25px"
    >
      <Heading as="h4" m={4} w="auto" h="auto">
        {"Example Table"}
      </Heading>
      <VStack
        w="100%"
        h="auto"
        justifyContent="flex-start"
        alignContent="center"
        spacing={4}
        px={4}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </VStack>
    </VStack>
  );
};

export default Table;
