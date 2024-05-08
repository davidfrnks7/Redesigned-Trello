"use client";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import TaskModal from "./modals/TaskModal";

export interface CardProps {
  card: TableCard;
  cardIndex: number;
  tableIndex: number;
  tableTitle: string;
}

const Card = ({
  card,
  cardIndex,
  tableIndex,
  tableTitle
}: CardProps): JSX.Element => {
  const {
    id,
    tableId,
    title,
    description,
    complexity,
    tags,
    plannedDueDate,
    checklist,
    activity,
    order,
    completed,
    creationDate,
    updatedDate
  } = card;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      mx={4}
      bg="gray.700"
      w="100%"
      h="fit-content"
      borderRadius="25px"
      onClick={onOpen}
      cursor="pointer"
    >
      <Text m={4} fontSize="lg">
        {title}
      </Text>
      <TaskModal
        card={card}
        cardIndex={cardIndex}
        tableIndex={tableIndex}
        tableTitle={tableTitle}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default Card;
