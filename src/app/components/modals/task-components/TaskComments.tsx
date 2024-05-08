import { Text } from "@chakra-ui/react";
import React from "react";

interface TaskCommentsProps {
  comments: CardComment[];
}

const TaskComments = ({ comments }: TaskCommentsProps): JSX.Element => {
  return <Text>{"Comments & Activity"}</Text>;
};

export default TaskComments;
