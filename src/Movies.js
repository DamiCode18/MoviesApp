import React from 'react'
import { Box, Text, Image, SimpleGrid } from '@chakra-ui/react'
import {FeaturedMovies} from "./featuredMovies";

export default function Movies() {    
  return (
    <Box>
      <Text color="#fff" fontWeight="bold" p={2}>Featured</Text>
      <SimpleGrid columns={{base: 2, md: 4, lg: 6, xl: 8 }} spacing={5}>
      {FeaturedMovies.map(movie => (
        <Box maxW={80} cursor="pointer">
          <Image src={movie.Poster} alt="movie_poster" borderRadius='xl' h="260px" w="168.5px" objectFit="cover" />
          <Text 
            color="#fff"
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
