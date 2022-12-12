import {
  Card,
  Heading,
  HStack,
  VStack,
  Text,
  FormLabel,
  Input,
  FormControl,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function ContactForm() {
  const { auth } = useAuth();
  const toast = useToast();
  const [userFirstName, setUserFirstName] = useState(
    auth?.firstName ? auth.firstName : ''
  );
  const [userLastName, setUserLastName] = useState(
    auth?.lastName ? auth.lastName : ''
  );
  const [userPhone, setUserPhone] = useState(auth?.phone ? auth.phone : '');
  const [userEmail, setUserEmail] = useState(auth?.email ? auth.email : '');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    const data = { userFirstName, userLastName, userEmail, userPhone, message };

    await axios
      .post('/questionforms', data)
      .then(response => {
        setUserFirstName('');
        setUserLastName('');
        setUserEmail('');
        setUserPhone('');
        setMessage('');
        toast({
          title: 'Form sent.',
          description: `Thanks for contacting us, ${userFirstName}.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.log(error?.response?.data);
        toast({
          title: 'Something wrong...',
          description: `Try again later ${auth.firstName}.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <Card
      direction="column"
      overflow="hidden"
      variant="elevated"
      size="lg"
      align="center"
      justifyContent="center"
      shadow="lg"
      w="70vw"
      m="0 auto"
    >
      <Heading align="center" size="md" m="5">
        Contact us:
      </Heading>
      <VStack align="center" justify="center" p="5" w="90%">
        <Text mb="5">
          Please fill out the form below and we will contact you as soon as
          possible.
        </Text>
        <HStack spacing="5" w="100%">
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              value={userFirstName}
              onChange={e => setUserFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              type="text"
              value={userLastName}
              onChange={e => setUserLastName(e.target.value)}
            />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone</FormLabel>
          <Input
            type="tel"
            value={userPhone}
            onChange={e => setUserPhone(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </FormControl>
        <Button
          isDisabled={
            !userFirstName ||
            !userLastName ||
            !userEmail ||
            !userPhone ||
            !message
          }
          w="90%"
          mt="10"
          align="center"
          onClick={handleSubmit}
        >
          Send form
        </Button>
      </VStack>
    </Card>
  );
}
