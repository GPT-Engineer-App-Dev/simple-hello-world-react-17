import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Hello World</Text>
      <Button as={Link} to="/events" colorScheme="teal">Manage Events</Button>
        <Button as={Link} to="/venues" colorScheme="teal">Manage Venues</Button>
      </VStack>
    </Container>
  );
};

export default Index;