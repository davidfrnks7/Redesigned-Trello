"use client";
import { Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "./Card";
import NewCardForm from "./forms/NewCardForm";
import AddElementButton from "./buttons/AddElementButton";

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
      <Heading as="h3" m={4} w="auto" h="auto">
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
          return (
            <Card
              key={`${title}-${index}`}
              cardTitle={title}
              cardIndex={index}
              cardId={card.id}
              tableIndex={tableIndex}
            />
          );
        })}
        {showNewCardForm ? (
          <NewCardForm
            setShowForm={setShowNewCardForm}
            tableIndex={tableIndex}
          />
        ) : undefined}
        {cards.length === 0 || mouseHover || showNewCardForm ? (
          <AddElementButton
            isElementOpen={showNewCardForm}
            toggleElement={setShowNewCardForm}
            isFullSize={cards.length === 0 ? true : false}
            elementName={cards.length === 0 ? "card" : undefined}
          />
        ) : undefined}
      </VStack>
    </VStack>
  );
};

export default Table;
