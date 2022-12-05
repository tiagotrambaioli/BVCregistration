import React from 'react';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { Link as RouterDom } from 'react-router-dom';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState('');

  const signInHandler = async user => {
    setLoading(' ');
  };

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="elevated"
      size="lg"
      align="center"
      justifyContent="space-between"
      shadow="lg"
    >
      <Stack align="center" mt="1" w="lg">
        <CardBody align="center" w="90%">
          <VStack>
            <Heading align="center" size="md" m="5">
              Sign In to BVC
            </Heading>

            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="Password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              leftIcon={<CheckIcon />}
              m="1"
              w="100%"
              align="center"
              onClick={signInHandler}
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </VStack>
        </CardBody>

        <CardFooter align="center">
          <Link as={RouterDom} to="/" mr="2">
            Back to home.
          </Link>
          <Text size="sm">
            Any questions?
            <Link as={RouterDom} to="/contact" ml="3">
              Click here.
            </Link>
          </Text>
        </CardFooter>
      </Stack>
    </Card>
  );
}
