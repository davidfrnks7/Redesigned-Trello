"use client";
import { Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "./Card";
import NewCardForm from "./forms/NewCardForm";
import CreateCard from "./buttons/CreateCard";

interface TableProps {
  title: string;
  tableIndex: number;
  cards: TableCard[];
}

const Table = ({ tableIndex, title, cards }: TableProps): JSX.Element => {
  const [showNewCardForm, setShowNewCardForm] = useState<boolean>(false);
  const [mouseHover, setMoueHover] = useState<boolean>(false);

  const onMouseEnter = (): void => {
    setMoueHover(true);
  };

  const onMouseLeave = (): void => {
    setMoueHover(false);
  };

  return (
    <VStack
      minH="80vh"
      w="350px"
      bg="blackAlpha.800"
      justifyContent="flex-start"
      alignContent="center"
      borderRadius="25px"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Heading as="h4" m={4} w="auto" h="auto">
        {title}
      </Heading>
      <VStack
        w="100%"
        h="auto"
        justifyContent="flex-start"
        alignContent="center"
        spacing={4}
        px={4}
      >
        {cards.map((card, index) => {
          const { title } = card;
          return <Card key={title} cardTitle={title} cardIndex={index} />;
        })}
        {showNewCardForm && (
          <NewCardForm
            setShowForm={setShowNewCardForm}
            tableIndex={tableIndex}
          />
        )}
        {(cards.length === 0 || mouseHover || showNewCardForm) && (
          <CreateCard
            isFormOpen={showNewCardForm}
            toggleForm={setShowNewCardForm}
          />
        )}
      </VStack>
    </VStack>
  );
};

export default Table;
