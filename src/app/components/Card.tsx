import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface CardProps {
  cardIndex: number;
  cardTitle: string;
}

const Card = ({ cardTitle }: CardProps): JSX.Element => {
  return (
    <Box mx={4} bg="gray.700" w="100%" h="fit-content" borderRadius="25px">
      <Text m={4} fontSize="lg">
        {cardTitle}
      </Text>
    </Box>
  );
};

export default Card;
