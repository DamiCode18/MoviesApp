import React, { useState, useRef } from "react";
import {
  Box,
  Text,
  Flex,
  Spacer,
  Input,
  useToast,
  FormControl,
  InputGroup,
  InputLeftElement,
  Button,
  useOutsideClick,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Search2Icon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { darkModeState, moviesDataState } from "../recoil/darkmode";
import { fetchMovies } from "./Api";

export default function Navbar() {
  const [mode, setMode] = useRecoilState(darkModeState);
  const ref = useRef();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [setMovie] = useRecoilState(moviesDataState);
  const color = mode === "dark" ? "white" : "black";

  const handleChange = (e) => {
    setTitle(e.target.value.toLowerCase());
  };

  useOutsideClick({
    ref: ref,
    handler: () => !title && setShow(false),
  });

  const { data, refetch } = useQuery(
    ["fetch-movies", title],
    () => fetchMovies(title),
    {
      enabled: fetch,
      onSuccess: () => {
        data?.Error === "Movie not found!"
          ? toast({
              position: "top",
              title: "Quite unfortunate!.",
              description: "Movie cannot be found at this time.",
              status: "error",
              duration: 3000,
              isClosable: true,
            })
          : setMovie(data);
        setFetch(false);
      },
      onError: () => {
        setFetch(false);
        console.log("ERROR");
      },
    }
  );
  const searchMovie = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <Flex px={10}>
      <Box mr={10}>
        <Text color="#e50914" fontWeight={700} fontSize={25} cursor="pointer">
          NETFLIX
        </Text>
      </Box>
      <Box mt={2}>
        <Flex>
          <Text mr={4} color={color} fontWeight={500} fontSize={14}>
            TV Shows
          </Text>
          <Text mr={4} color={color} fontWeight={500} fontSize={14}>
            New & Popular
          </Text>
          <Text mr={4} color={color} fontWeight={500} fontSize={14}>
            My List
          </Text>
        </Flex>
      </Box>
      <Spacer />
      <Box position="relative">
        <Flex>
          <form onSubmit={searchMovie}>
            <FormControl
              ref={ref}
            >
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="true"
                  children={
                    show && (
                      <Search2Icon
                        color={color}
                        ml={2}
                        position="absolute"
                        left={1}
                        top="0.8rem"
                        cursor="pointer"
                        zIndex="999"
                        onClick={() => title === "" && setShow(!show)}
                      />
                    )
                  }
                />
                {show && (
                  <Input
                    autoComplete={false}
                    _placeholder={{ paddingLeft: "30px" }}
                    placeholder="search movies..."
                    type="search"
                    color={color}
                    borderColor="none"
                    value={title}
                    onChange={handleChange}
                  />
                )}
              </InputGroup>
              {!show && title.length === 0 && (
                <Search2Icon
                  color={color}
                  position="absolute"
                  right={3}
                  top="0.7rem"
                  cursor="pointer"
                  zIndex="1"
                  onClick={() => setShow(!show)}
                />
              )}
            </FormControl>
          </form>
          <Box>
        <Button
          colorScheme="gray.50"
          zIndex="999999"
        >
          {mode === "dark" ? (
            <SunIcon
              fontSize={18}
              cursor="pointer"
              color={color}
              onClick={() => setMode("light")}
            />
          ) : (
            <MoonIcon
              fontSize={18}
              cursor="pointer"
              color={color}
              onClick={() => setMode("dark")}
            />
          )}
        </Button>
      </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
