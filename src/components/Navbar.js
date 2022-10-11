import React from 'react'
import { Box, Text, Flex, Spacer, Input, useColorMode  } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function Navbar() {
  return (
    <Flex>
        <Box mr={10}><Text color="#e50914" fontWeight={700} fontSize={25} cursor="pointer">NETFLIX</Text></Box>
        <Box mt={2}>
            <Flex>
            <Text mr={4}  color="#fff" fontWeight={500} fontSize={14}>TV Shows</Text>
            <Text mr={4} color="#fff" fontWeight={500} fontSize={14}>New & Popular</Text>
            <Text mr={4} color="#fff" fontWeight={500} fontSize={14}>My List</Text>
            </Flex>
        </Box>
        <Spacer />
        <Box>
            <Flex>
            <Input type="text" color="#fff" borderColor="none" position="relative" />
            <Search2Icon color="#fff" position="absolute" right="3rem" top="0.6rem" cursor="pointer" />
            </Flex>
        </Box>
    </Flex>
  )
}
