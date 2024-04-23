import React from "react";
import {
  Box,
  HStack,
  Text,
  VStack,
  Link,
  Image,
  Button,
  BoxProps
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export const MotionBox = motion<BoxProps>(Box);

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      bg="brand.footer"
      w="100%"
      h="auto"
      pos="sticky"
      zIndex={1}
    >
      <VStack
        h="auto"
        w="auto"
        py={12}
        spacing={5}
        justifyItems="center"
        justifyContent="center"
      >
        <VStack spacing={2}>
          <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              href="https://github.com/davidfrnks7/redesigned-trello"
              target="_blank"
              rel="noopener"
            >
              <Button
                color="whiteAlpha"
                variant="credits"
                leftIcon={<Icon icon="akar-icons:github-fill" />}
              >
                {"View Codebase"}
              </Button>
            </Link>
          </MotionBox>
          <Text color="brand.footerText" fontSize="xs">
            <span role="img" aria-label="copyright">
              {"©"}
            </span>{" "}
            {`2024 - ${new Date().getFullYear()} David Franks`}
          </Text>
        </VStack>
        <VStack color="brand.footerText" spacing={0}>
          <Text fontSize="xs">
            {
              "An MVP app made by David Franks to demonstrate skills in UI/UX design, accessibility compliance, REST APIs, and database management."
            }
          </Text>
          <Text fontSize="xs">
            {
              "Logos are copyright or trademarked to their respective organizations"
            }
          </Text>
        </VStack>
        <HStack color="brand.footerText" spacing={2}>
          <Text fontSize="xl">{"Built on"}</Text>
          <Link
            aria-label="Next.js"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener"
          >
            <Icon fontSize="1.6rem" icon="logos:nextjs" />
          </Link>
        </HStack>
        <HStack color="brand.footerText" spacing={2}>
          <Text fontSize="xl">{"Designed with"}</Text>
          <Link
            aria-label="Chakra UI"
            href="https://chakra-ui.com/"
            rel="noopener"
            target="_blank"
          >
            <Image
              alt="Chakra UI Logo"
              h="2rem"
              src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/logo-colored@2x.png?raw=true"
            />
          </Link>
        </HStack>
        <HStack color="brand.footerText" spacing={2}>
          <Text fontSize="xl">{"Deployed using"}</Text>
          <Link
            aria-label="Vercel"
            href="https://vercel.com/"
            rel="noopener"
            target="_blank"
          >
            <Icon fontSize="1.75rem" icon="logos:vercel" />
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Footer;
