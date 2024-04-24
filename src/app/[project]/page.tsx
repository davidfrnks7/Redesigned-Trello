import { HStack } from "@chakra-ui/react";
import React from "react";
import Table from "../components/table";

const ProjectPage = (): JSX.Element => {
  return (
    <HStack h="100vh" w="100vw" justifyContent="center" alignItems="center" spacing={4}>
      <Table />
      <Table />
      <Table />
    </HStack>
  );
};

export default ProjectPage;
