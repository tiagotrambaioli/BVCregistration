import React from 'react';
import { Flex } from '@chakra-ui/react';
import SignIn from '../../components/SignIn';

export function Login() {
  return (
    <Flex align="center" justify="center" minH="80vh">
      <SignIn />
    </Flex>
  );
}
