import React from 'react'
import { Box, Text, Flex, Spacer } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex>
        <Box mr={10}><Text color="#e50914" fontWeight={700} fontSize={25}>NETFLIX</Text></Box>
        <Box mt={2}>
            <Flex>
            <Text mr={4} color="#fff" fontWeight={500} fontSize={14}>Home</Text>
            <Text mr={4}  color="#fff" fontWeight={500} fontSize={14}>TV Shows</Text>
            <Text mr={4} color="#fff" fontWeight={500} fontSize={14}>New & Popular</Text>
            <Text mr={4} color="#fff" fontWeight={500} fontSize={14}>My List</Text>
            <Text color="#fff" fontWeight={500} fontSize={14}>Browse</Text>
            </Flex>
        </Box>
        <Spacer />
    </Flex>
  )
}
