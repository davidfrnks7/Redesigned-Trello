import React from "react";
import Link from "next/link";
import { Heading, LinkBox, LinkOverlay, VStack } from "@chakra-ui/react";
import UpcomingDueTasks from "./feedback/UpcomingDueTasks";
import PastDueTasks from "./feedback/PastDueTasks";
import TotalTasks from "./feedback/TotalTasks";

interface ProjectTileProps {
  title: string;
  projectSlug: string;
  totalTasks: number;
  pastDueTasks: number;
  upcomingDueTasks: number;
}

const ProjectTile = ({
  title,
  projectSlug,
  totalTasks = 0,
  upcomingDueTasks = 0,
  pastDueTasks = 0
}: ProjectTileProps): JSX.Element => {
  return (
    <LinkBox w="350px" h="250px" bg="blackAlpha.400" borderRadius="25px">
      <Heading as="h2" textAlign="center" my={4} fontSize="3xl">
        <LinkOverlay as={Link} href={`/projects/${projectSlug}`}>
          {title}
        </LinkOverlay>
      </Heading>
      <VStack justifyContent="center" alignItems="center" px={10}>
        <TotalTasks totalTasks={totalTasks} />
        <PastDueTasks pastDueTasks={pastDueTasks} />
        <UpcomingDueTasks upcomingDueTasks={upcomingDueTasks} />
      </VStack>
    </LinkBox>
  );
};

export default ProjectTile;
