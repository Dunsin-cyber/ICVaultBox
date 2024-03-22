import React, { useState } from "react";
import {
  Box,
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
import { AuthContext } from "../context";
import * as vetkd from "ic-vetkd-utils";
import { hex_decode, hex_encode } from "../utils";

let fetched_symmetric_key = null;

function LandingPage() {
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);
  const { actor } = React.useContext(AuthContext);

  async function get_aes_256_gcm_key() {
    const seed = window.crypto.getRandomValues(new Uint8Array(32));
    const principal = await actor?.CheckPrincipal();
    const tsk = new vetkd.TransportSecretKey(seed);
    const ek_bytes_hex = await actor.encrypted_symmetric_key_for_vault(
      tsk.public_key()
    );
    const pk_bytes_hex = await actor.symmetric_key_verification_key();
    return tsk.decrypt_and_hash(
      hex_decode(ek_bytes_hex),
      hex_decode(pk_bytes_hex),
      principal.toUint8Array(),
      32,
      new TextEncoder().encode("aes-256-gcm")
    );
  }

  React.useEffect(() => {
    console.log(get_aes_256_gcm_key());
  }, []);

  return addNew ? (
    <AddPasswordView addNew={setAddNew} />
  ) : edit ? (
    <EditPasswordView edit={setEdit} />
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
  );
}

export default LandingPage;
