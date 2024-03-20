import React, { useState } from "react";
import {
  Box,
  HStack,
  Image,
  Text,
  Flex,
  Input,
  InputLeftElement,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import PasswordListView from "../components/PasswordListView";
import AddPasswordView from "./AddPassword";
import EditPasswordView from "./EditPasswordView";
import SplashScreen from "./SplashScreen";

function LandingPage() {
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);

  const [splashLoaded, setSplashLoaded] = useState(false);

  setTimeout(() => {
    setSplashLoaded(true);
  }, 3000);

  return addNew ? (
    <AddPasswordView addNew={setAddNew} />
  ) : edit ? (
    <EditPasswordView edit={setEdit} />
  ) : (
    <Box>
      {!splashLoaded ? (
        <SplashScreen />
      ) : (
        <Box
          width={`360px`}
          h={`550px`}
          mx={`auto`}
          // bg={`pink`}
          p={5}
          textAlign={`start`}
          pos={`relative`}
        >
          <Flex
            justify={`start`}
            // mx={6}
          >
            <Image src="Box.svg" m={`0`} mx={2} />

            <Text as={`b`} color={`#2931EE`}>
              IC Vault Box
            </Text>
          </Flex>

          <Text as={`b`} fontSize={`xl`}>
            Manage Your Passwords
          </Text>

          <InputGroup my={3}>
            <InputLeftElement pointerEvents="none">
              <Image src="Search.svg" m={`0`} mx={2} />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>

          <VStack>
            <PasswordListView edit={setEdit} />
          </VStack>

          <Flex
            pos={`absolute`}
            bottom={5}
            left={`50%`}
            transform={`translateX(-50%)`}
            w={`50px`}
            h={`50px`}
            borderRadius={`full`}
            bg={`#2931EE`}
            alignContent={`center`}
            justifyContent={`center`}
            onClick={() => setAddNew(!addNew)}
          >
            <Image src="add.svg" m={`0`} mx={2} w={`35%`} />
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default LandingPage;
