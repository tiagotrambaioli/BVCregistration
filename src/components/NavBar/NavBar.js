import React from 'react';
import Logo from '../../assets/Logo';
import { Box, Button, Stack, List, useToast } from '@chakra-ui/react';
import { IoLogOut } from 'react-icons/io5';
import useAuth from '../../hooks/useAuth';
import NavBarItem from './NavBarItem';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

export default function NavBar() {
  const toast = useToast();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async e => {
    try {
      await axios.post(
        '/logout',
        JSON.stringify({ token: auth.refreshToken }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setAuth({});
      toast({
        title: 'Successfully logged out!',
        description: `Good bye ${auth.firstName}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      if (!error?.response) {
        toast({
          title: 'Something wrong.',
          description: `No server response during logout.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Stack
      as="nav"
      pos="sticky"
      zIndex="sticky"
      top="0"
      bg="white"
      w="100vw"
      direction="row"
      align="center"
      justify="space-between"
      boxShadow="lg"
      p="1"
      mb="3"
    >
      <Box m="0" w="20vw">
        <Logo m="0" />
      </Box>
      <Stack direction="row" align="center" justfy="space-between">
        <List>
          <NavBarItem to="/" text="Home" icon="IoHome" />
          <NavBarItem to="/programs" text="Programs" icon="IoSchool" />
          <NavBarItem to="/courses" text="Courses" icon="IoBook" />
          <NavBarItem to="/contact" text="Contact" icon="IoMail" />
        </List>
      </Stack>
      <Stack direction="row" w="20vw" align="center" justify="center">
        {!auth?.firstName && (
          <List>
            <NavBarItem
              to="/login"
              text="Sign In"
              icon="IoPerson"
              variant="outline"
              size="sm"
            />
            <NavBarItem
              to="/register"
              text="Register"
              variant="solid"
              size="sm"
            />
          </List>
        )}
        {auth?.firstName && (
          <List>
            <NavBarItem
              to="/profile"
              text={`${auth.firstName} ${auth.lastName}`}
              icon="IoPerson"
              variant="link"
              size="sm"
            />
            <Button
              color="blue.900"
              leftIcon={<IoLogOut />}
              variant="link"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </List>
        )}
      </Stack>
    </Stack>
  );
}
