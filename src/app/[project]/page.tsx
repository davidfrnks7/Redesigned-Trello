import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Table from "./table";

const ProjectPage = (): JSX.Element => {
  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Text fontSize="3xl">
        <Table />
      </Text>
    </Flex>
  );
};

export default ProjectPage;
