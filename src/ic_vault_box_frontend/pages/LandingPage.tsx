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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import PasswordListView from "../components/PasswordListView";
import AddPasswordView from "./AddPassword";
import EditPasswordView from "./EditPasswordView";
import { AuthContext } from "../context";
import * as vetkd from "ic-vetkd-utils";
import { hex_decode } from "../utils";
import { addPassword, clearPassword } from "../redux/slice/passwordSlice";
import { useAppDispatch } from "../redux/hooks";

function LandingPage() {
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);
  const { actor, setSymmetricKey, symmetricKey } =
    React.useContext(AuthContext);
  const dispatch = useAppDispatch();
  const toast = useToast();

  async function get_aes_256_gcm_key() {
    const seed = window.crypto.getRandomValues(new Uint8Array(32));
    const principal = await actor?.CheckPrincipal();
    console.log(principal.toString());
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

  const fetchPasswords = async () => {
    try {
      // setLoading(true);
      dispatch(clearPassword());
      const pass = await actor.getPayload();
      // setLoading(false);
      pass.map((d) => {
        var passphrase = {
          cypher: d.password,
          name: d.site_name,
          updated_at: Number(d.last_updated),
        };
        dispatch(addPassword(passphrase));
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err.message,
      });
      console.log(err);
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    const call = async () => {
      const bab = await get_aes_256_gcm_key();
      setSymmetricKey(bab);
    };

    call();
    // fetchPasswords();
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

      {!symmetricKey ? (
        <Flex gap={3} justify={"center"} mt={2}>
          <Text fontSize={"10px"}>
            Fetching symmetric key (AES-GCM-256) to local storage...
          </Text>
          <Spinner thickness="2px" speed="0.65s" color="purple.500" />
        </Flex>
      ) : (
        <VStack>
          <PasswordListView edit={setEdit} />
        </VStack>
      )}

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
