"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack
} from "@chakra-ui/react";
import NewTableForm from "../forms/NewTableForm";

interface NewTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewTableModal = ({
  isOpen,
  onClose
}: NewTableModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{"Create Your Table"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <NewTableForm onClose={onClose} />
        </ModalBody>
        <ModalFooter>
          <HStack
            w="100%"
            h="auto"
            justifyContent="flex-start"
            alignContent="center"
          ></HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTableModal;
