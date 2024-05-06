import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface AddElementButtonProps {
  isElementOpen: boolean;
  toggleElement?: (bool: boolean) => void;
  onElementClose?: () => void;
  onElementOpen?: () => void;
  isFullSize: boolean;
  elementName?: string;
}

const AddElementButton = ({
  isElementOpen,
  toggleElement,
  onElementClose,
  onElementOpen,
  isFullSize,
  elementName
}: AddElementButtonProps): JSX.Element => {
  const handleFormToggle = (isFormOpen: boolean): void => {
    if (toggleElement) {
      toggleElement(!isFormOpen);
    }

    if (onElementClose && onElementOpen) {
      isElementOpen ? onElementClose() : onElementOpen();
    }
  };

  return (
    <Button
      type="button"
      bg="gray.700"
      w={isFullSize ? "100%" : "auto"}
      h="59px"
      borderRadius={isFullSize ? "25px" : "50px"}
      onClick={() => {
        handleFormToggle(isElementOpen);
      }}
    >
      {isElementOpen ? (
        <Icon fontSize="2rem" icon="solar:close-circle-bold-duotone" />
      ) : (
        <Icon fontSize="2rem" icon="solar:add-circle-bold" />
      )}
      {elementName && elementName.length > 0
        ? `Create a new ${elementName}`
        : undefined}
    </Button>
  );
};

export default AddElementButton;
