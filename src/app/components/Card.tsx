"use client";
import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DeleteCardButton from "./buttons/DeleteCardButton";

interface CardProps {
  cardIndex: number;
  cardTitle: string;
  tableIndex: number;
  cardId: string;
}

const Card = ({
  cardTitle,
  cardIndex,
  cardId,
  tableIndex
}: CardProps): JSX.Element => {
  const [mouseHover, setMoueHover] = useState<boolean>(false);

  const onMouseEnter = (): void => {
    setMoueHover(true);
  };

  const onMouseLeave = (): void => {
    setMoueHover(false);
  };

  return (
    <Box
      mx={4}
      bg="gray.700"
      w="100%"
      h="fit-content"
      borderRadius="25px"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Text m={4} fontSize="lg">
        {cardTitle}
      </Text>
      {mouseHover ? (
        <DeleteCardButton
          tableIndex={tableIndex}
          cardId={cardId}
          cardIndex={cardIndex}
        />
      ) : undefined}
    </Box>
  );
};

export default Card;
