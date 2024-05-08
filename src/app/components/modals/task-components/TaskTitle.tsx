import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import React from "react";

interface TaskTitleProps {
  title: string;
  handleChange: (newTitle: string) => void;
}

const TaskTitle = ({ title, handleChange }: TaskTitleProps): JSX.Element => {
  return (
    <Editable defaultValue={title} onChange={handleChange}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
};

export default TaskTitle;
