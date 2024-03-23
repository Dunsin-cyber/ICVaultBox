import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  useToast,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AuthContext } from "../context";
import { DateFormatter, hex_decode } from "../utils/index";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addPassword, clearPassword } from "../redux/slice/passwordSlice";

function passwwordListView({ edit }) {
  const [appear, setAppear] = useState(false);
  const { actor, symmetricKey } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [decrypt, setDecrypt] = React.useState("******************");
  const [loading2, setLoading2] = React.useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.password);

  const fetchPasswords = async () => {
    try {
      setLoading(true);
      dispatch(clearPassword());
      const pass = await actor.getPayload();
      setLoading(false);
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
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchPasswords();
  }, []);

  async function aes_gcm_decrypt(ciphertext_hex) {
    const iv_and_ciphertext = hex_decode(ciphertext_hex);
    const iv = iv_and_ciphertext.subarray(0, 12); // 96-bits; unique per message
    const ciphertext = iv_and_ciphertext.subarray(12);
    const aes_key = await window.crypto.subtle.importKey(
      "raw",
      symmetricKey,
      "AES-GCM",
      false,
      ["decrypt"]
    );
    let decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      aes_key,
      ciphertext
    );
    return new TextDecoder().decode(decrypted);
  }

  const handleDecrypt = async (pw: string) => {
    try {
      setLoading2(true);

      const val = await aes_gcm_decrypt(pw);
      setDecrypt(val);
      setLoading2(false);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err.message,
      });
      console.log(err);
      // addNew(false)
      setLoading2(false);
    }
  };

  return (
    <Box w={`100%`} pos={`relative`}>
      {data?.map((val, index) => (
        <HStack py={2} key={index}>
          <Image src="placeholder.svg" m={`0`} mx={2} />

          <Flex justify={`space-between`}>
            <VStack spacing={0}>
              <Box justify={`start`}>
                <Text as={`b`} color={`#2931EE`} fontSize={`lg`}>
                  {val?.name}
                </Text>
                {loading2 ? (
                  <Text fontSize={`xs`}>decrypting cypher {val.cypher}...</Text>
                ) : (
                  <Text fontSize={`xs`}>{decrypt}</Text>
                )}

                <Text fontSize={10}>{DateFormatter(val?.updated_at)}</Text>
              </Box>
            </VStack>

            <Flex
              align={`center`}
              ms={`110px`}
              onClick={() => handleDecrypt(val?.cypher)}
            >
              <Image src="readmore.svg" m={`0`} mx={2} />
            </Flex>

            {appear && (
              <Box
                pos={`absolute`}
                right={0}
                top={`50px`}
                borderRadius={10}
                w={`100px`}
                h={`80px`}
                bg={"white"}
                zIndex={88}
                border={`1px`}
              >
                <Text p={3} fontSize={10} onClick={() => edit(true)}>
                  Edit
                </Text>
                <Text p={3} fontSize={10}>
                  Delete
                </Text>
              </Box>
            )}
          </Flex>
        </HStack>
      ))}
      <Divider />
    </Box>
  );
}

export default passwwordListView;
