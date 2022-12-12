import React from 'react';
import {
  useToast,
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
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { Link as RouterDom, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';

export default function CreateCourse() {
  const [courseCode, setCourseCode] = useState(' ');
  const [courseName, setCourseName] = useState(' ');
  const [courseCredits, setCourseCredits] = useState(' ');
  const [tuitionPeriod, setTuitionPeriod] = useState('');
  const [tuitionDomestic, setTuitionDomestic] = useState('');
  const [tuitionInternational, setTuitionInternational] = useState('');
  const [outlines, setOutlines] = useState([]);
  const toast = useToast();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const addOutline = () => {
    console.log('outline');
    const outLines = [
      {
        academicYear: '',
        effectiveStartTerm: '',
        effectiveTermEnd: '',
        url: '',
      },
      ...outlines,
    ];
    setOutlines(outLines);
  };

  const changeOutline = (e, index, property) => {
    console.log('hi');
    const input = [...outlines];
    input[index][property] = e.target.value;
    setOutlines(input);
    console.log(outlines);
  };

  const deleteOutline = index => {
    const delOutline = [...outlines];
    delOutline.splice(index, 1);
    setOutlines(delOutline);
  };

  const handlecreate = async e => {
    const data = {
      courseCode,
      courseName,
      courseCredits,
      tuition: {
        period: tuitionPeriod,
        domestic: tuitionDomestic,
        international: tuitionInternational,
      },
      outlines,
    };
    await axios
      .post('/courses', data, {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        toast({
          title: 'Success.',
          description: `Course created.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/courses');
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
    <Card
      direction="column"
      overflow="hidden"
      variant="elevated"
      size="lg"
      align="center"
      justifyContent="space-between"
      shadow="lg"
      m="0 auto"
      mb="10"
      w="80%"
    >
      <Stack align="center" mb="10" w="90%">
        <CardBody align="center" w="100%">
          <Heading align="center" size="md" m="3">
            Create course
          </Heading>

          <SimpleGrid columns={2} spacing={5} w="100%" alignContent="center">
            <FormControl isRequired>
              <FormLabel>Course Code</FormLabel>
              <Input
                type="text"
                value={courseCode}
                onChange={e => setCourseCode(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Course Name</FormLabel>
              <Input
                type="text"
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Credits</FormLabel>
              <Input
                type="number"
                value={courseCredits}
                onChange={e => setCourseCredits(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Tuition Period</FormLabel>
              <Input
                type="text"
                value={tuitionPeriod}
                onChange={e => setTuitionPeriod(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Tuition Domestic (CAD $)</FormLabel>
              <Input
                type="number"
                value={tuitionDomestic}
                onChange={e => setTuitionDomestic(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Tuition International (CAD $)</FormLabel>
              <Input
                type="number"
                value={tuitionInternational}
                onChange={e => setTuitionInternational(e.target.value)}
              />
            </FormControl>
            <Heading gridColumn="span 2" size="md" mt="5" textAlign="center">
              Outlines
            </Heading>
            <Button
              gridColumn="1"
              textAlign="right"
              size="sm"
              w="6rem"
              colorScheme="blue"
              onClick={() => addOutline()}
            >
              Add Outline
            </Button>

            {outlines?.map((outline, index) => {
              return (
                <Box
                  gridColumn="span 2"
                  key={index}
                  shadow="md"
                  borderRadius="md"
                  p="3"
                >
                  <FormControl>
                    <FormLabel>Academic Year</FormLabel>
                    <Input
                      type="number"
                      value={outline.academicYear}
                      onChange={e => changeOutline(e, index, 'academicYear')}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Term Start:</FormLabel>
                    <Input
                      type="text"
                      value={outline.effectiveStartTerm}
                      onChange={e =>
                        changeOutline(e, index, 'effectiveStartTerm')
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Term End:</FormLabel>
                    <Input
                      type="text"
                      value={outline.effectiveTermEnd}
                      onChange={e =>
                        changeOutline(e, index, 'effectiveTermEnd')
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Outine URL:</FormLabel>
                    <Input
                      type="text"
                      value={outline.url}
                      onChange={e => changeOutline(e, index, 'url')}
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    my="2"
                    colorScheme="red"
                    onClick={() => deleteOutline(index)}
                  >
                    Delete
                  </Button>
                </Box>
              );
            })}
          </SimpleGrid>
          <Button
            mt="5"
            w="100%"
            align="center"
            colorScheme="blue"
            onClick={handlecreate}
          >
            Create Course
          </Button>
        </CardBody>

        <CardFooter m="0" p="0" align="center">
          <Link as={RouterDom} to="/courses">
            Back to courses...
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
}
