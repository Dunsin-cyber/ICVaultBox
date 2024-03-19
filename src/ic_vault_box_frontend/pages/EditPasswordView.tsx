import { Box, Button, Flex, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import React from "react"

function EditPasswordView({ edit }) {
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
            <Flex
                align={`center`}
                mb={5}
                onClick={() => edit(false)}
            >
                <Image
                    src="goBack.svg"
                    m={`0`}
                    mx={2}
                />
                <Text
                    fontSize={`xs`}
                    color={`#2931EE`}
                >
                    Go back
                </Text>
            </Flex>

            <Text
                fontSize={`xl`}
                as={`b`}
            // mb={5}
            >
                Edit Password
            </Text>

            <Text
                fontSize={`xs`}
                my={2}
            >
                Name
            </Text>
            <Input placeholder="Enter name" />

            <Text
                fontSize={`xs`}
                my={2}
            >
                Password
            </Text>
            <Input placeholder="Enter password" />

            <Flex
                mt={6}
                justify={`center`}
            >
                <Button
                    size='md'
                    height='35px'
                    width='300px'
                    bg={`#2931EE`}
                    color='white'
                >
                    Save
                </Button>
            </Flex>
        </Box>
    )
}

export default EditPasswordView