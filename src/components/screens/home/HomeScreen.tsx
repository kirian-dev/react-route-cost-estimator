import { FC, useState, FormEvent, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet-routing-machine';

export const HomeScreen: FC = () => {
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const [origin, setOrigin] = useState<[number, number]>();
  const [destination, setDestination] = useState<[number, number]>();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (originRef.current && destinationRef.current) {
      const originValue = originRef.current.value;
      const destinationValue = destinationRef.current.value;

      const [originResponse, destinationResponse] = await Promise.all([
        fetch(`https://nominatim.openstreetmap.org/search?q=${originValue}&format=json`),
        fetch(`https://nominatim.openstreetmap.org/search?q=${destinationValue}&format=json`),
      ]);

      const [originData, destinationData] = await Promise.all([originResponse.json(), destinationResponse.json()]);

      if (originData[0]) {
        setOrigin([parseFloat(originData[0].lat), parseFloat(originData[0].lon)]);
      }

      if (destinationData[0]) {
        setDestination([parseFloat(destinationData[0].lat), parseFloat(destinationData[0].lon)]);
      }
    }
  };

  const handleClear = () => {
    if (originRef.current) {
      originRef.current.value = '';
    }
    if (destinationRef.current) {
      destinationRef.current.value = '';
    }
    setOrigin([0, 0]);
    setDestination([0, 0]);
  };

  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="100vh" w="100vw">
      <Box position="absolute" left={0} top={0} h="100%" w="100%" zIndex="1">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {origin && (
            <Marker position={origin}>
              <Popup>{originRef.current?.value}</Popup>
            </Marker>
          )}
          {destination && (
            <Marker position={destination}>
              <Popup>{destinationRef.current?.value}</Popup>
            </Marker>
          )}
        </MapContainer>
      </Box>

      <Box p={4} borderRadius="lg" m={4} bgColor="white" shadow="base" minW="container.md" zIndex="100">
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Input type="text" placeholder="Origin address" ref={originRef} />
          </Box>
          <Box flexGrow={1}>
            <Input type="text" placeholder="End address" ref={destinationRef} />
          </Box>

          <ButtonGroup>
            <Button colorScheme="blue" type="button" onClick={handleSubmit}>
              Calculate Route
            </Button>
            <IconButton aria-label="center back" icon={<FaTimes />} onClick={handleClear} />
          </ButtonGroup>
        </HStack>
      </Box>
    </Flex>
  );
};
