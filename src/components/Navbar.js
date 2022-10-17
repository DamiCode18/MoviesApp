/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { useRecoilState, useSetRecoilState } from "recoil";
import { darkModeState, moviesDataState } from "../recoil/darkmode";
import { fetchMovies } from "./Api";
import "./Navbar.css";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useRecoilState(darkModeState);
  const ref = useRef();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [fetch, setFetch] = useState(false);
  const setMovie = useSetRecoilState(moviesDataState);
  const color = mode === "dark" ? "white" : "black";
  const color2 = mode === "dark" ? "black" : "white";

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
      },
    }
  );
  const searchMovie = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <Flex background={color2} p={{ base: "0", md: 4 }} className="main-header">
      <Box mr={10}>
        <Text
          fontSize={{ base: "17px", md: "25px" }}
          color="#e50914"
          fontWeight={700}
          cursor="pointer"
          p={{ base: "2", md: "0px" }}
        >
          NETFLIX
        </Text>
      </Box>
      <Box mt={3}>
        <Box
          order={{base: "2", md:"1"}}
          href="#"
          color={color}
          className="toggle-button"
          onClick={() => setActive(!active)}
        >
          {active ? (
            <>
              <span className="RotateX"></span>
              <span className="RotateY"></span>
            </>
          ) : (
            <>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </>
          )}
        </Box>
        <nav style={{color: color}} className="main-nav">
          <ul className={active && "active"}>
            <li>
              TV Shows
            </li>
            <li>
            New & Popular
            </li>
            <li>
            My List
            </li>
            <li>
              <form className="li-search" onSubmit={searchMovie} mt={-2}>
                <FormControl ref={ref}>
                  <InputGroup size="sm">
                    <InputLeftElement
                      pointerEvents="true"
                      children={
                        show && (
                          <Search2Icon
                            color={color}
                            ml={2}
                            position="absolute"
                            left={1}
                            top="0rem"
                            cursor="pointer"
                            zIndex="999"
                            onClick={() => title === "" && setShow(!show)}
                          />
                        )
                      }
                    />
                    {show && (
                      <Input
                        autoComplete="false"
                        _placeholder={{ paddingLeft: "30px" }}
                        placeholder="search movies..."
                        type="search"
                        color={color}
                        marginTop="-10px"
                        borderColor="none"
                        value={title}
                        borderRadius="3xl"
                        onChange={handleChange}
                      />
                    )}
                  </InputGroup>
                  {!show && title.length === 0 && (
                    <Search2Icon
                      color={color}
                      position="absolute"
                      right={3}
                      top="0.2rem"
                      cursor="pointer"
                      zIndex="1"
                      onClick={() => setShow(!show)}
                    />
                  )}
                </FormControl>
              </form>
            </li>
          </ul>
        </nav>
      </Box>
      <Spacer />
      <Box position="relative" order={{base: "1", md: '2'}}>
        <Flex>
          <Box mt={0.5} mx={2}>
            <Button
              bg={color === "black" ? "gray.200" : "gray.500"}
              zIndex="999999"
              borderRadius="1.375rem"
              h="32px"
              minH="32px"
              w="30px"
              verticalAlign="middle"
              minW="30px"
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
