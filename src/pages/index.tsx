import React from "react";
import Layout from "../app/layout";
import { NextPageWithLayout } from "@/types/page";
import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import NewProjectModal from "@/app/components/modals/NewProject";

const Home: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const project: Project = useAppSelector((state) => state.project);

  return (
    <main>
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        {project.title.length > 0 ?
          (
            <Heading>{project.title}</Heading>
          )
          :
          (
            <Button
              onClick={() => {
                onOpen();
              }}
              variant="project"
              leftIcon={<Icon fontSize="2rem" icon="ic:baseline-plus" />}
            >
              {"Create your first project"}
            </Button>
          )
        }
        {isOpen && <NewProjectModal isOpen={isOpen} onClose={onClose} />}
      </Flex>
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
