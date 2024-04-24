import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Table = (): JSX.Element => {
  return (
    <VStack
      minH="80vh"
      w="350px"
      bg="blackAlpha.800"
      justifyContent="flex-start"
      alignContent="center"
    >
      <Heading as="h2" m={4} w="auto" h="auto">
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
        <Box mx={4} bg="gray.700" w="100%" h="fit-content">
          <Text m={4} fontSize="lg">
            {"This is an example card"}
          </Text>
        </Box>
        <Box mx={4} bg="gray.700" w="100%" h="fit-content">
          <Text m={4} fontSize="lg">
            {"This is an example card"}
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
};

export default Table;
