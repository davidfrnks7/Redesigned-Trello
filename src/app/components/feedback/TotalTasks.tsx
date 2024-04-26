import { HStack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface TotalTasksProps {
  totalTasks: number;
}

const TotalTasks = ({ totalTasks = 0 }: TotalTasksProps): JSX.Element => {
  return (
    <HStack bg="gray.400" p={2} color="blackAlpha.900" w="100%">
      <Icon fontSize="1.5rem" icon="solar:info-circle-bold" />
      <Text>{`${totalTasks} Total tasks`}</Text>
    </HStack>
  );
};

export default TotalTasks;
