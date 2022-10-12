import React from 'react'
import {Box} from "@chakra-ui/react";
import Navbar from './Navbar'
import {darkModeState} from '../recoil/darkmode';
import { useRecoilValue } from 'recoil';
import Movies from '../Movies';


export default function Wrapper() {
const mode = useRecoilValue(darkModeState);
const bg =  mode === "dark" ? 'black' : 'white';
const color = mode === "dark" ? 'white' : 'black';
  return (
    <Box bg={bg} color={color} px={10} mt={2}>
      <Navbar />
       <Movies />
    </Box>
  )
}
