import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface CreateCardProps {
  isFormOpen: boolean;
  toggleForm: (bool: boolean) => void;
}

const CreateCardButton = ({
  isFormOpen,
  toggleForm
}: CreateCardProps): JSX.Element => {
  const handleFormToggle = (isFormOpen: boolean): void => {
    toggleForm(!isFormOpen);
  };

  return (
    <Button
      type="button"
      bg="gray.700"
      w="100%"
      h="59px"
      borderRadius="25px"
      leftIcon={
        isFormOpen ? (
          <Icon fontSize="2rem" icon="solar:close-circle-bold-duotone" />
        ) : (
          <Icon fontSize="2rem" icon="solar:add-circle-bold" />
        )
      }
      onClick={() => {
        handleFormToggle(isFormOpen);
      }}
    >
      {isFormOpen ? "Cancel" : "Create a new card"}
    </Button>
  );
};

export default CreateCardButton;
