import { useState } from 'react';
import { Container, Heading, Button, VStack, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from '../integrations/supabase/index.js';

const Venues = () => {
  const { data: venues, isLoading, isError } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();
  const toast = useToast();

  const [newVenue, setNewVenue] = useState({ name: '', capacity: '', type: '' });

  const handleAddVenue = async () => {
    try {
      await addVenue.mutateAsync(newVenue);
      toast({ title: 'Venue added.', status: 'success', duration: 2000 });
      setNewVenue({ name: '', capacity: '', type: '' });
    } catch (error) {
      toast({ title: 'Error adding venue.', status: 'error', duration: 2000 });
    }
  };

  const handleUpdateVenue = async (venue) => {
    try {
      await updateVenue.mutateAsync(venue);
      toast({ title: 'Venue updated.', status: 'success', duration: 2000 });
    } catch (error) {
      toast({ title: 'Error updating venue.', status: 'error', duration: 2000 });
    }
  };

  const handleDeleteVenue = async (id) => {
    try {
      await deleteVenue.mutateAsync(id);
      toast({ title: 'Venue deleted.', status: 'success', duration: 2000 });
    } catch (error) {
      toast({ title: 'Error deleting venue.', status: 'error', duration: 2000 });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading venues.</div>;

  return (
    <Container>
      <Heading as="h1" size="xl" mb={4}>Venues</Heading>
      <VStack spacing={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Capacity</Th>
              <Th>Type</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {venues.map(venue => (
              <Tr key={venue.id}>
                <Td>{venue.name}</Td>
                <Td>{venue.capacity}</Td>
                <Td>{venue.type}</Td>
                <Td>
                  <Button onClick={() => handleUpdateVenue(venue)} colorScheme="blue" size="sm" mr={2}>Update</Button>
                  <Button onClick={() => handleDeleteVenue(venue.id)} colorScheme="red" size="sm">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Heading as="h2" size="md" mt={6}>Add New Venue</Heading>
        <input type="text" placeholder="Name" value={newVenue.name} onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })} />
        <input type="number" placeholder="Capacity" value={newVenue.capacity} onChange={(e) => setNewVenue({ ...newVenue, capacity: e.target.value })} />
        <input type="text" placeholder="Type" value={newVenue.type} onChange={(e) => setNewVenue({ ...newVenue, type: e.target.value })} />
        <Button onClick={handleAddVenue} colorScheme="teal">Add Venue</Button>
      </VStack>
    </Container>
  );
};

export default Venues;