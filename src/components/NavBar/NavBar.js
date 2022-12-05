import React from 'react';
import Logo from '../../assets/Logo';
import { Box, Stack, List } from '@chakra-ui/react';

import NavBarItem from './NavBarItem';

export default function NavBar() {
  return (
    <>
      <Stack
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
        </Stack>
      </Stack>
    </>
  );
}
