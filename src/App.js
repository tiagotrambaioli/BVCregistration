import React from 'react';
import { ChakraProvider, Flex, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Programs } from './pages/Programs';
import { Courses } from './pages/Courses';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh">
        <NavBar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path=":id" element={<Programs />} />
            <Route
              element={<RequireAuth allowedRoles={['admin', 'student']} />}
            >
              <Route path="/courses" element={<Courses />} />
              <Route path=":id" element={<Courses />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Profile />} /> // pending
          </Route>
        </Routes>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
