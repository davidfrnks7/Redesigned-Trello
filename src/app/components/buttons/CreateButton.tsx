import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface CreateButtonPops {
  buttonText: string;
  onOpen: () => void;
}

const CreateButton = ({
  buttonText,
  onOpen
}: CreateButtonPops): JSX.Element => {
  return (
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
      <Button
        onClick={() => {
          onOpen();
        }}
        variant="project"
        leftIcon={<Icon fontSize="2rem" icon="solar:add-circle-bold" />}
      >
        {buttonText}
      </Button>
    </Flex>
  );
};

export default CreateButton;
