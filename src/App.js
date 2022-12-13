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
import ShowProgram from './components/ShowProgram';
import UpdateCourse from './pages/Courses/UpdateCourse';
import CreateCourse from './pages/Courses/CreateCourse';
import CreateProgram from './pages/Programs/CreateProgram';
import UpdateProgram from './pages/Programs/UpdateProgram';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh">
        <NavBar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:uuid" element={<ShowProgram />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:uuid" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              element={<RequireAuth allowedRoles={['admin', 'student']} />}
            >
              <Route path="/programs/create" element={<CreateProgram />} />
              <Route
                path="/programs/update/:uuid"
                element={<UpdateProgram />}
              />
              <Route path="/courses/create" element={<CreateCourse />} />
              <Route path="/courses/update/:code" element={<UpdateCourse />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
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
