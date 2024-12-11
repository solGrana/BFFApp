import {
    Button, Input, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea, useDisclosure, Radio,
    RadioGroup, ModalFooter, useToast
} from '@chakra-ui/react'
import React from 'react'
import { BiAddToQueue } from "react-icons/bi"
import { useState } from 'react'
import { BASE_URL } from "../App";


export const CreateUSerModal = ({setUsers}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",
        gender: "",
    });

    const toast = useToast()

    const handleCreateUser = async (e) => {
        e.preventDefault(); // prevent page refresh
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }

            toast({
                status: "success",
                title: "Yayy! 🎉",
                description: "Friend created successfully.",
                duration: 2000,
                position: "top-center",
            });
            onClose();
            setUsers((prevUsers) => [...prevUsers, data]);

            setInputs({
                name: "",
                role: "",
                description: "",
                gender: "",
            }); // clear inputs

        } catch (error) {
            toast({
                status: "error",
                title: "An error occurred.",
                description: error.message,
                duration: 4000,
            });
        } finally {
            setIsLoading(false);
        }
    };


    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20} />
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <form onSubmit={(handleCreateUser)} >
                <ModalContent>
                    <ModalHeader> My new BFF 😍 </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>

                            <FormControl>
                                <FormLabel> Full Name</FormLabel>
                                <Input placeholder='Nate Weller' value={inputs.name}
                                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}></Input>

                            </FormControl>

                            <FormControl>
                                <FormLabel> Role </FormLabel>
                                <Input placeholder='SWE' value={inputs.role}
                                    onChange={(e) => setInputs({ ...inputs, role: e.target.value })}></Input>

                            </FormControl>
                        </Flex>

                        <FormControl>
                            <FormLabel> Description </FormLabel>
                            <Textarea resize={"none"} overflowY={"hidden"} placeholder='He works at google'
                                value={inputs.description}
                                onChange={(e) => setInputs({ ...inputs, description: e.target.value })} />
                        </FormControl>

                        <RadioGroup mt={4}>
                            <Flex gap={5}>
                                <Radio value='male' onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}> Male </Radio>
                                <Radio value='female' onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>Female</Radio>
                            </Flex>
                        </RadioGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type='submit'
                            isLoading={isLoading}>
                            Add
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    </>
};


