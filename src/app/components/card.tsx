import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Card = (): JSX.Element => {
  return (
    <Box mx={4} bg="gray.700" w="100%" h="fit-content" borderRadius="25px">
      <Text m={4} fontSize="lg">
        {"This is an example card"}
      </Text>
    </Box>
  );
};

export default Card;
