"use client";
import React from "react";
import { Box, HStack, Heading, useDisclosure } from "@chakra-ui/react";
import { useAppSelector } from "@/app/lib/redux/hooks";
import NewProjectModal from "@/app/components/modals/NewProjectModal";
import ProjectTile from "@/app/components/ProjectTile";
import CreateButton from "@/app/components/buttons/CreateButton";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const project: Project = useAppSelector(state => state.project);

  return (
    <main>
      <Box h="100vh" w="100vw">
        {project.title.length > 0 ? (
          <Box h="100%" w="100%">
            <Heading
              as="h2"
              textAlign="center"
              fontSize="7xl"
              mt="30vh"
              mb="5vh"
            >
              {"Your Projects"}
            </Heading>
            <HStack justifyContent="center" spacing={12}>
              <ProjectTile
                title={project.title}
                projectSlug={project.slug}
                totalTasks={0}
                pastDueTasks={0}
                upcomingDueTasks={0}
              />
            </HStack>
          </Box>
        ) : (
          <CreateButton
            onOpen={onOpen}
            buttonText="Create your first project"
          />
        )}
        {isOpen ? <NewProjectModal isOpen onClose={onClose} /> : undefined}
      </Box>
    </main>
  );
};

export default Home;
