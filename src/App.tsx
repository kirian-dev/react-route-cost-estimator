import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { HomeScreen } from './components/screens/home/HomeScreen';
import { RouteDataScreen } from './components/screens/route-data/RouteDataScreen';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#FFF5F5',
        color: 'gray.700',
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Routes>
          <Route element={<HomeScreen />} path="/" />
          <Route element={<RouteDataScreen />} path="/route-info" />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;
