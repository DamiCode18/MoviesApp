import React from 'react'
import { Box, Text, Image, SimpleGrid, Flex, useColorMode, Spacer, useColorModeValue } from '@chakra-ui/react'
import {FeaturedMovies} from "./featuredMovies";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

export default function Movies() {    
  const {colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('black', 'white')
  const color = useColorModeValue('white', 'black')
  return (
    <Box bg={bg} color={color}>
      <Flex justify="sp">
        <Text color={color} fontWeight="bold" p={2}>Featured</Text>
        <Spacer />
        <Box>
        {colorMode === 'dark' ? <SunIcon color={color} onClick={toggleColorMode} /> : <MoonIcon color={color} onClick={toggleColorMode} /> } 
        </Box>
        </Flex>
      <SimpleGrid columns={{base: 2, md: 4, lg: 6, xl: 8 }} spacing={5}>
      {FeaturedMovies.map(movie => (
        <Box maxW={80} cursor="pointer">
          <Image src={movie.Poster} alt="movie_poster" borderRadius='xl' h="260px" w="168.5px" objectFit="cover" />
          <Text 
           color={color}
            fontSize="sm"
            fontWeight="semi-bold">
              {movie.Title}
          </Text>
        </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
