import { HStack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface UpcomingDueTasksProps {
  upcomingDueTasks: number;
}

const UpcomingDueTasks = ({
  upcomingDueTasks = 0
}: UpcomingDueTasksProps): JSX.Element => {
  return (
    <HStack
      bg={upcomingDueTasks > 0 ? "brand.danger" : "gray.400"}
      p={2}
      color="blackAlpha.900"
      w="100%"
    >
      <Icon fontSize="1.5rem" icon="solar:danger-triangle-bold" />
      <Text>{`${upcomingDueTasks} Upcoming due tasks`}</Text>
    </HStack>
  );
};

export default UpcomingDueTasks;
