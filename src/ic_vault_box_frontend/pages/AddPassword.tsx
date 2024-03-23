import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as vetkd from "ic-vetkd-utils";
import { AuthContext } from "../context";
import { hex_decode, hex_encode } from "../utils";

function AddPasswordView({ addNew }) {
  const { actor, symmetricKey } = React.useContext(AuthContext);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  async function aes_gcm_encrypt(message) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bits; unique per message
    const aes_key = await window.crypto.subtle.importKey(
      "raw",
      symmetricKey,
      "AES-GCM",
      false,
      ["encrypt"]
    );
    const message_encoded = new TextEncoder().encode(message);
    const ciphertext_buffer = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      aes_key,
      message_encoded
    );
    const ciphertext = new Uint8Array(ciphertext_buffer);
    var iv_and_ciphertext = new Uint8Array(iv.length + ciphertext.length);
    iv_and_ciphertext.set(iv, 0);
    iv_and_ciphertext.set(ciphertext, iv.length);
    return hex_encode(iv_and_ciphertext);
  }

  const handleSubmit = async () => {
    // if (
    //   (name.length < 2 && password.length < 2)
    //   (name.length < 2 && password.length > 2) ||
    //   (name.length > 2 && password.length < 2)
    // ) {
    //   return toast({
    //     title: "Please fill in all fields",
    //   });
    // }
    setLoading(true);
    const str = name + "/n" + password;
    try {
      const cypher = await aes_gcm_encrypt(str);
      console.log("cyper", cypher);
      await actor.uploadPayload(name, name, [], [], cypher);
      toast({
        title: "Password Encrypted Successfully",
      });
      addNew(false);
      setLoading(false);
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.message,
      });
      // addNew(false)
      setLoading(false);
    }
  };

  return (
    <Box
      width={`360px`}
      h={`550px`}
      mx={`auto`}
      // bg={`pink`}
      p={5}
      textAlign={`start`}
      pos={`relative`}
    >
      <Flex align={`center`} mb={5} onClick={() => addNew(false)}>
        <Image src="goBack.svg" m={`0`} mx={2} />
        <Text fontSize={`xs`} color={`#2931EE`}>
          Go back
        </Text>
      </Flex>

      <Text
        fontSize={`xl`}
        as={`b`}
        // mb={5}
      >
        Add New Password
      </Text>

      <Text fontSize={`xs`} my={2}>
        Name
      </Text>
      <Input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Text fontSize={`xs`} my={2}>
        Password
      </Text>
      <Input
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Flex mt={6} justify={`center`}>
        <Button
          size="md"
          height="35px"
          width="300px"
          bg={`#2931EE`}
          color="white"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
}

export default AddPasswordView;
