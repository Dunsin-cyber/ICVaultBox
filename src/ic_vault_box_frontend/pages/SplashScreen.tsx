import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

function SplashScreen() {
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
      </Box>
    </Box>
  );
}

export default SplashScreen;
