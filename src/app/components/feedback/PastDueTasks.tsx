import { HStack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface PastDueTasksProps {
  pastDueTasks: number;
}

const PastDueTasks = ({ pastDueTasks = 0 }: PastDueTasksProps): JSX.Element => {
  return (
    <HStack
      bg={pastDueTasks > 0 ? "brand.warning" : "gray.400"}
      p={2}
      color="blackAlpha.900"
      w="100%"
    >
      <Icon fontSize="1.5rem" icon="solar:danger-bold" />
      <Text>{`${pastDueTasks} Past due tasks`}</Text>
    </HStack>
  );
};

export default PastDueTasks;
