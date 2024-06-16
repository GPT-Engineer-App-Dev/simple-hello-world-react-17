import { useState } from 'react';
import { Container, Heading, Button, VStack, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const toast = useToast();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', venue: '' });

  const handleAddEvent = async () => {
    try {
      await addEvent.mutateAsync(newEvent);
      toast({ title: 'Event added.', status: 'success', duration: 2000 });
      setNewEvent({ name: '', date: '', venue: '' });
    } catch (error) {
      toast({ title: 'Error adding event.', status: 'error', duration: 2000 });
    }
  };

  const handleUpdateEvent = async (event) => {
    try {
      await updateEvent.mutateAsync(event);
      toast({ title: 'Event updated.', status: 'success', duration: 2000 });
    } catch (error) {
      toast({ title: 'Error updating event.', status: 'error', duration: 2000 });
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast({ title: 'Event deleted.', status: 'success', duration: 2000 });
    } catch (error) {
      toast({ title: 'Error deleting event.', status: 'error', duration: 2000 });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events.</div>;

  return (
    <Container>
      <Heading as="h1" size="xl" mb={4}>Events</Heading>
      <VStack spacing={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Venue</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map(event => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>{event.venue}</Td>
                <Td>
                  <Button onClick={() => handleUpdateEvent(event)} colorScheme="blue" size="sm" mr={2}>Update</Button>
                  <Button onClick={() => handleDeleteEvent(event.id)} colorScheme="red" size="sm">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Heading as="h2" size="md" mt={6}>Add New Event</Heading>
        <input type="text" placeholder="Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
        <input type="date" placeholder="Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
        <input type="number" placeholder="Venue" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} />
        <Button onClick={handleAddEvent} colorScheme="teal">Add Event</Button>
      </VStack>
    </Container>
  );
};

export default Events;