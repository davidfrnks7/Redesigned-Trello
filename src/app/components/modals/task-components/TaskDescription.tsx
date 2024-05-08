import { Box, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

interface TaskTitleProps {
  description: string;
  handleChange: (newDescription: string) => void;
}

const TaskDescription = ({
  description,
  handleChange
}: TaskTitleProps): JSX.Element => {
  const [editDescription, setEditDescription] = useState<boolean>(false);

  return (
    <Box
      w="100%"
      h="100%"
      cursor="text"
      onClick={() => {
        setEditDescription(true);
      }}
    >
      {description.length > 0 && !editDescription
        ? description.split("\n").map((line, index) => {
            if (line.length) {
              return <Text key={`${line}-${index}`}>{line}</Text>;
            }
          })
        : undefined}
      {description.length === 0 && !editDescription ? (
        <Text>{"Describe your task"}</Text>
      ) : undefined}
      {editDescription ? (
        <Textarea
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          resize={"none"}
          w="100%"
          size="lg"
          h="25vh"
          onChange={e => {
            handleChange(e.target.value);
          }}
          value={description}
          onBlur={() => {
            setEditDescription(false);
          }}
        />
      ) : undefined}
    </Box>
  );
};

export default TaskDescription;
