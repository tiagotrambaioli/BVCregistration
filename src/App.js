import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Programs } from './pages/Programs';
import { Courses } from './pages/Courses';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/programs" element={<Programs />}>
          <Route index element={<Programs />} />
          <Route path=":id" element={<Programs />} />
        </Route>
        <Route path="/courses" element={<Courses />}>
          <Route index element={<Courses />} />
          <Route path=":id" element={<Courses />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Profile />} /> // pending
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
