import React from "react";
import Layout from "../app/layout";
import { NextPageWithLayout } from "@/types/page";
import { Flex, Heading } from "@chakra-ui/react";

const Home: NextPageWithLayout = () => {
  return (
    <main>
      <Flex h="71vh" w="100vw" justifyContent="center" alignItems="center">
        <Heading h="auto" w="auto">
          {"Placeholder"}
        </Heading>
      </Flex>
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
