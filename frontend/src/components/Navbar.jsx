import { Box, ColorModeContext, Container, Flex, Text, useColorMode, useColorModeValue, Button } from '@chakra-ui/react'
import React from 'react'
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { CreateUSerModal } from './CreateUSerModal'


export const Navbar = ({setUsers}) => {

    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Container maxW={"900px"}>
            <Box
                px={4}
                my={4}
                borderRadius={5}
                bg={useColorModeValue("gray.200", "gray.700")}
            >

                <Flex h="16"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    {/* Left side */}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        gap={3}
                        display={{ base: "none", sm: "flex" }}
                    >
                        <img src="/react.png" alt="react logo" width={50} height={50} />
                        <Text fontSize={"40px"}>+</Text>
                        <img src="/react.png" alt="react logo" width={50} height={50} />
                        <Text fontSize={"40px"}>=</Text>
                        <img src="/react.png" alt="react logo" width={50} height={50} />

                    </Flex>
                    {/* Right side */}
                    <Flex gap={3} alignItems={"center"}>
                        <Text fontSize={"lg"} fontWeight={500} display={{ base: "none", md: "block" }}>
                            BFFship
                        </Text>

                        <Button onClick={toggleColorMode}>
							{colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
						</Button>

                        <CreateUSerModal  setUsers={setUsers}/>

                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}
