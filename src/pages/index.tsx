import React from "react";
import Layout from "../app/layout";
import { NextPageWithLayout } from "@/types/page";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  useDisclosure
} from "@chakra-ui/react";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import NewProjectModal from "@/app/components/modals/NewProjectModal";
import ProjectTile from "@/app/components/ProjectTile";

const Home: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const project: Project = useAppSelector((state) => state.project);

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
          <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                onOpen();
              }}
              variant="project"
              leftIcon={<Icon fontSize="2rem" icon="solar:add-circle-bold" />}
            >
              {"Create your first project"}
            </Button>
          </Flex>
        )}
        {isOpen && <NewProjectModal isOpen={isOpen} onClose={onClose} />}
      </Box>
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
