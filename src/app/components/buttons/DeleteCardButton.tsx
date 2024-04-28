"use client";
import { deleteCard } from "@/app/lib/redux/features/projects/projectsSlice";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { Button } from "@chakra-ui/react";
import React from "react";

interface DeleteCardButtonProps {
  tableIndex: number;
  cardIndex: number;
  cardId: string | undefined;
}

const DeleteCardButton = ({
  tableIndex,
  cardIndex,
  cardId
}: DeleteCardButtonProps): JSX.Element => {
  // Redux
  const dispatch = useAppDispatch();

  const handleDeleteCard = async (): Promise<void> => {
    return await new Promise((resolve, reject) => {
      const deletedCard = dispatch(
        deleteCard({ tableIndex, cardIndex, cardId })
      );
      const deletedCardId = deletedCard.payload.cardId;

      if (deletedCardId === cardId) {
        return resolve();
      }

      console.error(
        `The wrong card may have been deleted, or not deleted at all. The deleted card id is ${deletedCardId} and the expected deleted card id ${cardId}.`
      );
      return reject();
    });
  };
  return <Button onClick={() => handleDeleteCard()}>{"DELETE CARD"}</Button>;
};

export default DeleteCardButton;
