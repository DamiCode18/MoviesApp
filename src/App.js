import './App.css';
import { RecoilRoot } from 'recoil';
import  Movies from './Movies';
import Navbar from './components/Navbar';
import { Box } from "@chakra-ui/react"
function App() {
  return (
    <Box mx={10} mt={2}>
    <RecoilRoot>
      <Navbar />
       <Movies />
    </RecoilRoot>
    </Box>
  );
}

export default App;
