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
      <Box position="relative">
        <Heading
          position="absolute"
          maxW="400px"
          top='50%'
          color='red.600'
          opacity={.8}
          fontSize={{ base: '14px', md: '40px', lg: '56px' }}
          left='50%'
          margin='-100px 0 0 -150px'
        >
          Unlimited Access to your Favorites Movies
        </Heading>
        <Image
          src={Poster}
          alt="image of a movie"
          objectFit={{base: "cover", md: 'contain', lg: 'contain'}}
          h={{base: "400px", md: "550px", lg: "700px"}}
          w="full"
        />
        {/* <Box
          as="video"
          controls
          w='full'
          h='700px'
          autoplay
          src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
          alt="Big Buck Bunny"
          objectFit="cover"
          sx={{
            aspectRatio: "16/9",
          }}
        /> */}
      </Box>
      <Flex>
        <Text color={color} fontWeight="bold" p={2} mt={2}>
          Featured
        </Text>
        <Spacer />
      </Flex>
      <SimpleGrid columns={{ base: 2, md: 4, lg: 6, xl: 8 }} spacing={5}>
        {movies.map((movie) => (
          <Box key={movie.Title} cursor="pointer" h="350px" py={4}>
            <Image
              src={movie.Poster}
              alt="movie_poster"
              borderRadius="xl"
              w="100%"
              h="300px"
              objectFit="cover"
            />
            <Text color={color} fontSize="sm" fontWeight="semi-bold">
              {movie.Title.length >= 20 ? (
                <Tooltip
                  placement="top"
                  label={movie.Title}
                  aria-label="A tooltip"
                >
                  <Text
                    overflow="hidden"
                    w="auto"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >{`${movie.Title}`}</Text>
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
