import React from 'react';
import {
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  SimpleGrid,
  useToast,
  Button,
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { useApiGet } from '../../hooks/useApi';
import CourseDisplay from './CourseDisplay';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function SearchCourses(props) {
  const [search, setSearch] = useState('');
  const [searchParam, setSearchParam] = useState(props?.search);
  const { data: courses } = useApiGet('/courses', searchParam);
  const { auth } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSearch = e => {
    setSearch(e.target.value);
    setSearchParam(e.target.value);
  };

  const handleDelete = async e => {
    const uuid = e.target.value;
    const courseIndex = courses.findIndex(course => course.uuid === uuid);

    await axios
      .delete(`/courses/${uuid}`, {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(response => {
        toast({
          title: 'Success.',
          description: `Course deleted.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        courses.splice(courseIndex, 1);
        setSearch(current => `${current}    `);
      })
      .catch(error => {
        console.log(error?.response?.data);
        toast({
          title: 'Something wrong...',
          description: `Try again later.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack width="100vw" align="center" my="10">
      {auth?.role === 'admin' && (
        <Button
          mb="3"
          colorScheme="blue"
          onClick={() => {
            navigate('/courses/create');
          }}
        >
          Create course
        </Button>
      )}
      <InputGroup w="60vw">
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearch color="#718096" />}
        />
        <Input
          value={search}
          onChange={handleSearch}
          placeholder="Search courses..."
        />
      </InputGroup>

      {courses.length === 0 && search.length > 0 && (
        <Box mt="2">
          No results found. Search again by Course Code or Course Name
        </Box>
      )}

      <SimpleGrid
        w="90vw"
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(500px, 1fr))"
        alignItems="center"
      >
        {courses?.map((course, index) => {
          return (
            <CourseDisplay
              key={index}
              uuid={course?.uuid}
              courseCode={course?.courseCode}
              courseName={course?.courseName}
              courseCredits={course?.courseCredits}
              tuition={course?.tuition}
              outlines={course?.outlines}
              handleDelete={handleDelete}
            />
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}
