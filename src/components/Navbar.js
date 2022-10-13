import React, {useState} from 'react'
import { Box, Text, Flex, Spacer, Input, useToast  } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import {useQuery} from "@tanstack/react-query";
import { useRecoilValue, useRecoilState, } from 'recoil';
import {darkModeState, moviesDataState } from "../recoil/darkmode";
import { fetchMovies } from './Api';


export default function Navbar() {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [fetch, setFetch] = useState(false);
  const [movie, setMovie] = useRecoilState(moviesDataState);
  const mode = useRecoilValue(darkModeState);
  const color = mode === "dark" ? 'white' : 'black';
  const handleChange=(e)=>{
    setTitle(e.target.value.toLowerCase());
  }
  const clearFilter=()=>{
    setTitle("");
    setMovie('');
  }

    const {data, refetch} = useQuery(['fetch-movies', title], ()=>fetchMovies(title), {
      enabled: fetch,
      onSuccess: ()=>{
        data?.Error === "Movie not found!" ?
          toast({
            position: "top",
            title: 'Quite unfortunate!.',
            description: "Movie cannot be found at this time.",
            status: 'error',
            duration: 3000,
            isClosable: true,
          }) :
          setMovie(data); 
          setFetch(false);    
      },
      onError: ()=>{
        setFetch(false);
        console.log('ERROR');
      },
    })
  return (
    <Flex>
        <Box mr={10}><Text color="#e50914" fontWeight={700} fontSize={25} cursor="pointer">NETFLIX</Text></Box>
        <Box mt={2}>
            <Flex>
            <Text mr={4}  color={color} fontWeight={500} fontSize={14}>TV Shows</Text>
            <Text mr={4} color={color} fontWeight={500} fontSize={14}>New & Popular</Text>
            <Text mr={4} color={color} fontWeight={500} fontSize={14}>My List</Text>
            </Flex>
        </Box>
        <Spacer />
        <Box position="relative" >
            <Flex>
            <Input placeholder="search movies..." type="text" color={color} borderColor="none" value={title} onChange={handleChange} />
            {title && <Search2Icon color={color} position="absolute" right={3} top="0.7rem" cursor="pointer" onClick={refetch} zIndex="1"/>}
            </Flex>
        </Box>
        {movie && <Box mx={3} fontWeight="bold" cursor="pointer" my={2} onClick={clearFilter}>x</Box>}
    </Flex>
  )
}
