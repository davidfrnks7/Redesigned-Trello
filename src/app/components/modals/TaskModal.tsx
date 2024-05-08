"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Text,
  VStack,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  Textarea
} from "@chakra-ui/react";
import { CardProps } from "../Card";
import TaskTitle from "./task-components/TaskTitle";
import TaskDescription from "./task-components/TaskDescription";
import TaskComments from "./task-components/TaskComments";

interface NewProjectModalProps extends CardProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal = ({
  card,
  tableIndex,
  tableTitle,
  cardIndex,
  isOpen,
  onClose
}: NewProjectModalProps): JSX.Element => {
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

  //  * Handle Edited Data * //

  // Track if anything was edited.
  const [dataEdited, setDataEdited] = useState<boolean>(false);

  // Store Edited Data
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedDescription, setEditedDescription] =
    useState<string>(description);
  const [editedComplexity, setEditedComplexity] =
    useState<Complexity>(complexity);
  const [editedTags, setEditedTags] = useState<CardTag[]>(tags);
  const [editedPlannedDueDate, setEditedPlannedDueDate] = useState<
    string | null
  >(plannedDueDate);
  const [editedChecklist, setEditedChecklist] =
    useState<CardChecklistItem[]>(checklist);
  const [editedActivity, setEditedActivity] = useState<CardComment[]>(activity);
  const [editedOrder, setEditedOrder] = useState<number>(order);
  const [editedCompleted, setEditedCompleted] = useState<boolean>(completed);

  // If something was edited change the edited flag.
  const handleEdited = (): void => {
    setDataEdited(true);
  };

  // * Handle Change * //

  const handleTitleChange = (newTitle: string): void => {
    if (!dataEdited) {
      setDataEdited(true);
    }

    setEditedTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string): void => {
    if (!dataEdited) {
      setDataEdited(true);
    }

    setEditedDescription(newDescription);
  };

  // * Handle Submit & Reset * //

  // Reset data if user cancels.
  const handleResetData = (): void => {
    setDataEdited(false);

    setEditedTitle(title);
    setEditedDescription(description);
    setEditedComplexity(complexity);
    setEditedTags(tags);
    setEditedPlannedDueDate(plannedDueDate);
    setEditedChecklist(checklist);
    setEditedActivity(activity);
    setEditedOrder(order);
    setEditedCompleted(completed);
  };

  // Submit edited data
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = (): void => {
    setSubmitting(true);

    // Call edit slice

    // Verify new data was updated.

    setSubmitting(false);
    setDataEdited(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h2" mb={0} pb={0}>
          <TaskTitle title={editedTitle} handleChange={handleTitleChange} />
        </ModalHeader>
        <ModalCloseButton />
        <Text px={6} pb={6}>{`In the ${tableTitle} table`}</Text>
        <ModalBody>
          <VStack alignContent="center" justifyContent="flex-start">
            <HStack
              h="100%"
              w="100%"
              alignContent="center"
              justifyContent="flex-start"
            >
              <VStack
                h="100%"
                w="70%"
                alignContent="center"
                justifyContent="flex-start"
              >
                <TaskDescription
                  description={editedDescription}
                  handleChange={handleDescriptionChange}
                />
                <TaskComments comments={activity} />
              </VStack>
              <VStack
                h="100%"
                w="30%"
                alignContent="center"
                justifyContent="flex-start"
              >
                <Text>
                  {
                    "Tags, checklists, due date, completed, complexity, and actions"
                  }
                </Text>
              </VStack>
            </HStack>
          </VStack>
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

export default TaskModal;
