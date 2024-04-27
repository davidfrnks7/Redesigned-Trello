"use client";
import React from "react";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { Box, HStack, useDisclosure } from "@chakra-ui/react";
import NewTableModal from "@/app/components/modals/NewTableModal";
import TableTile from "@/app/components/TableTile";
import CreateButton from "@/app/components/buttons/CreateButton";

const ProjectPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tables = useAppSelector(state => state.project.tables);

  return (
    <Box h="100vh" w="100vw">
      {tables.length === 0 ? (
        <CreateButton onOpen={onOpen} buttonText="Create your first table" />
      ) : undefined}
      {isOpen ? <NewTableModal isOpen onClose={onClose} /> : undefined}
      {tables.length > 0 ? (
        <HStack
          h="100vh"
          w="100vw"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          {tables.map((table, index) => {
            const { title, cards } = table;
            return (
              <TableTile
                key={`${title}-${index}`}
                title={title}
                cards={cards}
                tableIndex={index}
              />
            );
          })}
        </HStack>
      ) : undefined}
    </Box>
  );
};

export default ProjectPage;
