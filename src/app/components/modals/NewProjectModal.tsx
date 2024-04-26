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
import NewProjectForm from "../forms/NewProjectForm";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewProjectModal = ({
  isOpen,
  onClose
}: NewProjectModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{"Create Your Project"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <NewProjectForm onClose={onClose} />
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

export default NewProjectModal;
