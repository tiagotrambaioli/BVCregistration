import React from 'react';
import { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';

import axios from '../../api/axios';
import {
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
import { Link as RouterDom, useNavigate, useLocation } from 'react-router-dom';

export default function SignIn() {
  const { setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const toast = useToast();
  const usernameRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  useEffect(() => {
    setErrorMsg('');
  }, [username, password]);

  const signInHandler = async e => {
    setLoading(true);

    try {
      const response = await axios.post(
        '/login',
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const user = response?.data;
      setAuth({
        ...user,
      });
      setUsername('');
      setPassword('');
      toast({
        title: 'You are logged in.',
        description: `Welcome back ${user.firstName}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      if (!error?.response) {
        setErrorMsg('No server response.');
      } else if (error.response?.status === 400) {
        setErrorMsg('Missing username or password.');
      } else if (error.response?.status === 401) {
        setErrorMsg('Not allowed.');
      } else {
        setErrorMsg('Login failed.');
      }
    }
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

            {errorMsg && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error:</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            <FormControl id="username" isRequired isDisabled={isLoading}>
              <FormLabel>Username</FormLabel>
              <Input
                ref={usernameRef}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="Password" isRequired isDisabled={isLoading}>
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
