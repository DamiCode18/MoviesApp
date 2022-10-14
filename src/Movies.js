import React, { useState } from "react";
import {
  Box,
  Text,
  Image,
  SimpleGrid,
  Flex,
  Spacer,
  Badge,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import { FeaturedMovies, Poster } from "./featuredMovies";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkModeState, moviesDataState } from "./recoil/darkmode";

export default function Movies() {
  const [movies, setMovies] = useState(FeaturedMovies);
  const [mode] = useRecoilState(darkModeState);
  const movie = useRecoilValue(moviesDataState);
  const color = mode === "dark" ? "white" : "black";
  console.log(movie);
  return (
    <Box>
      <Box>
        <Heading>Unlimited Access to your Favorites Movies</Heading>
        <Image src={Poster} alt="image of a movie" objectFit="cover" />
      </Box>
      <Flex>
        <Text color={color} fontWeight="bold" p={2}>
          Featured
        </Text>
        <Spacer />
      </Flex>
      <SimpleGrid columns={{ base: 2, md: 4, lg: 6, xl: 8 }} spacing={5}>
        {movies.map((movie) => (
          <Box key={movie.Title} maxW={80} cursor="pointer">
            <Image
              src={movie.Poster}
              alt="movie_poster"
              borderRadius="xl"
              h="260px"
              w="168.5px"
              objectFit="cover"
            />
            <Text color={color} fontSize="sm" fontWeight="semi-bold">
              {movie.Title.length >= 20 ? (
                <Tooltip
                  placement="top"
                  label={movie.Title}
                  aria-label="A tooltip"
                >
                  <Text>{`${movie.Title.substring(0, 20)}...`}</Text>
                </Tooltip>
              ) : (
                movie.Title
              )}
            </Text>
            <Badge>IMDB</Badge>-
            <Badge colorScheme="pink" borderRadius={10} w={10}>
              {movie.imdbRating}
            </Badge>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
