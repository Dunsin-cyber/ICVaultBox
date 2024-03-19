import React, { useState } from "react"
import { Box, Button, Divider, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";

function passwwordListView({ edit }) {

    const [appear, setAppear] = useState(false)

    return (
        <Box
            w={`100%`}
            pos={`relative`}
        >
            <HStack
                py={2}
            >
                <Image
                    src="placeholder.svg"
                    m={`0`}
                    mx={2}
                />

                <Flex
                    justify={`space-between`}
                >
                    <VStack
                        spacing={0}
                    >
                        <Box justify={`start`}>
                            <Text
                                as={`b`}
                                color={`#2931EE`}
                                fontSize={`lg`}
                            >
                                Metamask
                            </Text>

                            <Text
                                fontSize={`xs`}
                            >
                                ******************
                            </Text>

                            <Text
                                fontSize={10}
                            >
                                Updated 2 mins ago
                            </Text>
                        </Box>
                    </VStack>

                    <Flex
                        align={`center`}
                        ms={`110px`}
                        onClick={() => setAppear(!appear)}
                    >
                        <Image
                            src="readmore.svg"
                            m={`0`}
                            mx={2}
                        />
                    </Flex>

                    {appear && <Box
                        pos={`absolute`}
                        right={0}
                        top={`50px`}
                        borderRadius={10}
                        w={`100px`}
                        h={`80px`}
                        bg={'white'}
                        zIndex={88}
                        border={`1px`}
                    >
                        <Text
                            p={3}
                            fontSize={10}
                            onClick={() => edit(true)}
                        >
                            Edit
                        </Text>
                        <Text
                            p={3}
                            fontSize={10}
                        >
                            Delete
                        </Text>
                    </Box>}
                </Flex>
            </HStack>
            <Divider />
        </Box >
    );
}

export default passwwordListView