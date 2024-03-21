import React from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { AuthContext } from "../context";

function SplashScreen() {
  const { Auth, loading } = React.useContext(AuthContext);
  return (
    <Box
      h={`100vh`}
      mx={`auto`}
      w={{ base: "full", md: "360px" }}
      p={5}
      textAlign={`start`}
      pos={`relative`}
      bgColor="#2931EE"
      color={"white"}
      display="flex"
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <Image src="white-box.svg" />
        <Box h={3} />
        <Text fontStyle={"bold"}>IC Vault Box</Text>
        <Button mt={2} onClick={Auth} isLoading={loading}>
          Authenitcate
        </Button>
      </Box>
    </Box>
  );
}

export default SplashScreen;
