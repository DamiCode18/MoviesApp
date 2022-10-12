import React from 'react'
import { Box, Text, Image, SimpleGrid, Flex, Spacer, Badge, Button, Tooltip } from '@chakra-ui/react'
import {FeaturedMovies} from "./featuredMovies";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import { useRecoilState } from "recoil";
import { darkModeState } from './recoil/darkmode';


export default function Movies() {    
  const [mode, setMode] = useRecoilState(darkModeState);
  const color = mode === "dark" ? 'white' : 'black';
  return (
    <Box>
      <Flex>
        <Text color={color} fontWeight="bold" p={2}>Featured</Text>
        <Spacer />
        <Box>
        <Button colorScheme='gray.50' m={2} p={2}>
          {mode === 'dark' ? 
          <SunIcon fontSize={18} cursor="pointer" color={color} onClick={()=>setMode('light')} /> 
          : <MoonIcon fontSize={18} cursor="pointer" color={color} onClick={()=>setMode('dark')} /> 
          } 
          </Button>
        </Box>
        </Flex>
      <SimpleGrid columns={{base: 2, md: 4, lg: 6, xl: 8 }} spacing={5}>
      {FeaturedMovies.map(movie => (
        <Box key={movie.Title} maxW={80} cursor="pointer">
          <Image src={movie.Poster} alt="movie_poster" borderRadius='xl' h="260px" w="168.5px" objectFit="cover" />
          <Text 
           color={color}
            fontSize="sm"
            fontWeight="semi-bold">
            {movie.Title.length >= 20 ? 
            <Tooltip placement='top' label={movie.Title} aria-label='A tooltip'>
              <Text>{`${movie.Title.substring(0, 20)}...`}</Text>
            </Tooltip> : movie.Title}
          </Text>
          <Badge>IMDB</Badge>-<Badge colorScheme="pink" borderRadius={10} w={10}>{movie.imdbRating}</Badge>
        </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
