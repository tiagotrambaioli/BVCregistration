import React from 'react';
import { useState, useRef } from 'react';
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
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { Link as RouterDom, useNavigate } from 'react-router-dom/dist';
import axios from '../../api/axios';

export default function SignUp() {
  const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const firstNameRef = useRef();
  const errRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDoB] = useState('');
  const [username, setUsername] = useState('');
  const [validUsername, setValidUserame] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);

    setValidUserame(result);
  }, [username]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);

    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMsg('');
  }, [username, password, matchPassword]);

  const handleSubmit = async e => {
    setLoading(true);
    const validUser = USERNAME_REGEX.test(username);
    const validPass = PASSWORD_REGEX.test(password);
    if (!validUser || !validPass) {
      setErrorMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(
        '/users',
        JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          username,
          password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setSuccess(true);
      toast({
        title: 'Account created.',
        description: "We've created your account for you. Please sign in.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      setLoading(false);
      if (!error?.response) {
        setErrorMsg('Something wrong... No server response.');
      } else if (error.response?.status === 409) {
        setErrorMsg(error.response?.data?.error);
      } else {
        setErrorMsg(error.response?.data?.error);
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
      mb="4"
    >
      <Stack align="center" w="md">
        <CardBody align="center" w="90%">
          <VStack>
            <Heading align="center" size="md">
              Sign up to BVC
            </Heading>

            {errorMsg && (
              <Alert status="error" ref={errRef} aria-live="assertive">
                <AlertIcon />
                <AlertTitle>Error:</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            <FormControl isRequired isReadOnly={isLoading}>
              <FormLabel>First name</FormLabel>
              <Input
                ref={firstNameRef}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired isReadOnly={isLoading}>
              <FormLabel>Last name</FormLabel>
              <Input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired isReadOnly={isLoading}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <FormHelperText align="left">
                We'll never share your e-mail.
              </FormHelperText>
            </FormControl>
            <FormControl isRequired isReadOnly={isLoading}>
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </FormControl>
            <FormControl id="date-of-birth" isRequired isReadOnly={isLoading}>
              <FormLabel>Date of birth</FormLabel>
              <Input
                type="date"
                value={dateOfBirth}
                onChange={e => setDoB(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired isReadOnly={isLoading}>
              <FormLabel>
                Username
                {validUsername && <CheckIcon mx="2" />}
              </FormLabel>
              <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                aria-invalid={validUsername ? 'false' : 'true'}
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
              {usernameFocus && username && !validUsername && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>4 to 24 characters.</AlertTitle>
                  <AlertDescription>
                    Must begin with a letter. Letters, numbers, underscores,
                    hyphens allowed.
                  </AlertDescription>
                </Alert>
              )}
            </FormControl>
            <FormControl isRequired isReadOnly={isLoading}>
              <FormLabel>
                Password
                {validPassword && <CheckIcon mx="2" />}
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                aria-invalid={validPassword ? 'false' : 'true'}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              {passwordFocus && password && !validPassword && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>6 to 24 characters.</AlertTitle>
                  <AlertDescription>
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                  </AlertDescription>
                </Alert>
              )}
            </FormControl>
            <FormControl isRequired isReadOnly={isLoading}>
              <FormLabel>
                Confirm Password
                {matchPassword && validMatch && <CheckIcon mx="2" />}
              </FormLabel>
              <Input
                mb="3"
                type="password"
                value={matchPassword}
                onChange={e => setMatchPassword(e.target.value)}
                aria-invalid={matchPassword ? 'false' : 'true'}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              {matchFocus && matchPassword && !validMatch && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>
                    Must match the first password input field.
                  </AlertDescription>
                </Alert>
              )}
            </FormControl>
            <Button
              isDisabled={
                !firstName ||
                !lastName ||
                !email ||
                !phone ||
                !dateOfBirth ||
                !username ||
                !password ||
                !matchPassword ||
                !validMatch
              }
              w="100%"
              align="center"
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Sign Up
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
