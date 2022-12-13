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
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  SimpleGrid,
  Box,
  HStack,
  Text,
  Divider,
  Checkbox,
} from '@chakra-ui/react';
import { Link as RouterDom, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useApiGet } from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useRef } from 'react';

export default function CreateProgram() {
  const [title, setTitle] = useState(' ');
  const [url, setUrl] = useState(' ');
  const [type, setType] = useState(' ');
  const [subtitle, setSubtitle] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [startdate, setStartDate] = useState([]);
  const [deliveryTypes, setDeliveryTypes] = useState([]);
  const [period, setPeriod] = useState('');
  const [tuitionDomestic, setTuitionDomestic] = useState('');
  const [tuitionInternational, setTuitionInternational] = useState('');
  const [terms, setTerms] = useState([]);
  const [term, setTerm] = useState('');
  const [date, setDate] = useState('');
  const [search, setSearch] = useState(' ');
  const [searchParam, setSearchParam] = useState(' ');
  const { data: courses } = useApiGet('/courses', searchParam);
  const toast = useToast();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const termInput = useRef(null);

  const addTerm = index => {
    const courseAdd = [{ term, ...courses[index] }, ...terms];
    setTerms(courseAdd);
    setSearchParam('    ');
  };

  const removeTerm = index => {
    const courseRemove = [...terms];
    courseRemove.splice(index, 1);
    setTerms(courseRemove);
  };

  const handledelivery = e => {
    if (e.target.checked === true) {
      const delivery = [...deliveryTypes, e.target.value];
      setDeliveryTypes(delivery);
    }

    if (e.target.checked === false) {
      const deliveryRemove = [...deliveryTypes];
      const item = deliveryRemove.findIndex(item => item === e.target.value);
      deliveryRemove.splice(item, 1);
      setDeliveryTypes(deliveryRemove);
    }
  };

  const addDate = e => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const newdate = new Date(date);
    const month = months[newdate.getMonth()];
    const day = newdate.getDay();
    const year = newdate.getFullYear();

    const dates = [...startdate, `${month} ${day}, ${year}`];
    setStartDate(dates);
  };

  const removedate = index => {
    const remove = [...startdate];
    remove.splice(index, 1);
    setStartDate(remove);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
    setSearchParam(e.target.value);
  };

  const handlecreate = async e => {
    const data = {
      title,
      url,
      type,
      subtitle,
      duration,
      category,
      image,
      startdate,
      deliveryTypes,
      tuition: {
        period: subtitle,
        domestic: tuitionDomestic,
        international: tuitionInternational,
      },
      terms,
    };
    await axios
      .post('/programs', data, {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        toast({
          title: 'Success.',
          description: `Program created.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/programs');
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
            Create program
          </Heading>

          <SimpleGrid columns={2} spacing={5} w="100%" alignContent="center">
            <FormControl isRequired>
              <FormLabel>Program title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Url</FormLabel>
              <Input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                value={type}
                onChange={e => setType(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Duration</FormLabel>
              <Input
                type="text"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Backgroun image</FormLabel>
              <Input
                type="url"
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Start dates</FormLabel>
              {startdate.map((date, index) => {
                return (
                  <Text size="2xl" my="2" key={index} align="left">
                    {date}{' '}
                    {
                      <Button
                        size="xs"
                        onClick={e => {
                          removedate(index);
                        }}
                      >
                        x
                      </Button>
                    }
                  </Text>
                );
              })}

              <Input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
              <Button size="sm" w="90%" my="2" onClick={addDate}>
                Add date
              </Button>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Delivery types</FormLabel>
              <SimpleGrid
                columns={2}
                spacing={5}
                w="100%"
                alignContent="center"
              >
                <Checkbox
                  flexGrow="1"
                  value="Any-time online"
                  onChange={handledelivery}
                >
                  Any-time online
                </Checkbox>
                <Checkbox
                  flexGrow="1"
                  value="In Class"
                  onChange={handledelivery}
                >
                  In Class
                </Checkbox>
                <Checkbox
                  flexGrow="1"
                  value="Blended"
                  onChange={handledelivery}
                >
                  Blended
                </Checkbox>
                <Checkbox
                  flexGrow="1"
                  value="Real-time Online"
                  onChange={handledelivery}
                >
                  Real-time Online
                </Checkbox>
                <Checkbox
                  flexGrow="1"
                  value="Combined Online"
                  onChange={handledelivery}
                >
                  Combined Online
                </Checkbox>
                <Checkbox
                  flexGrow="1"
                  value="Off-Campus"
                  onChange={handledelivery}
                >
                  Off-Campus
                </Checkbox>
              </SimpleGrid>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Tuition Period</FormLabel>
              <Input
                type="text"
                value={period}
                onChange={e => setPeriod(e.target.value)}
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
              Courses and terms
            </Heading>
            {/* courses goes here */}
            <SimpleGrid
              gridColumn="span 2"
              columns={2}
              spacing={5}
              w="100%"
              alignContent="center"
              mt="5"
            >
              {courses.length === 0 && search.length > 0 && (
                <Box mt="2" gridColumn="span 2">
                  No results found. Search again by Course Code or Course Name
                </Box>
              )}

              {terms?.map((course, index) => {
                return (
                  <Box key={index} shadow="md" borderRadius="md" p="3">
                    <Heading size="sm">
                      {course.courseCode} - {course.courseName}
                    </Heading>
                    <HStack gap="1" my="2">
                      <Heading
                        as="h3"
                        size="md"
                        fontWeight="semibold"
                        flexGrow="1"
                      >
                        Term: {course.term}
                      </Heading>
                      2{' '}
                      <Button size="sm" colorScheme="blue">
                        Download last outline
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => removeTerm(index)}
                      >
                        Remove course
                      </Button>
                    </HStack>
                  </Box>
                );
              })}
              <Button
                gridColumn="span 2"
                mt="5"
                w="100%"
                align="center"
                colorScheme="blue"
                onClick={handlecreate}
              >
                Create Program
              </Button>
            </SimpleGrid>
            {/* end of courses */}
            <Divider />
            <Heading gridColumn="span 2" size="md" mt="5" textAlign="center">
              Search courses
            </Heading>
            {/* course search goes here */}
            <InputGroup w="60%" gridColumn="span 2" justifySelf="center">
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
            <SimpleGrid
              gridColumn="span 2"
              columns={2}
              spacing={5}
              w="100%"
              alignContent="center"
              mt="5"
            >
              {courses.length === 0 && search.length > 0 && (
                <Box mt="2" gridColumn="span 2">
                  No results found. Search again by Course Code or Course Name
                </Box>
              )}

              {courses?.map((course, index) => {
                return (
                  <Box key={index} shadow="md" borderRadius="md" p="3">
                    <Heading size="sm">
                      {course.courseCode} - {course.courseName}
                    </Heading>
                    <HStack gap="1" my="2" py="2">
                      <Heading
                        as="h3"
                        size="md"
                        fontWeight="semibold"
                        flexGrow="1"
                      >
                        Term:
                      </Heading>
                      <Input
                        ref={termInput}
                        size="sm"
                        align="left"
                        w="4rem"
                        type="number"
                        min="1"
                        max="8"
                        value={term}
                        onFocus={e => (e.target.style.color = 'black')}
                        onBlur={e => (e.target.style.color = 'transparent')}
                        color="transparent"
                        onChange={e => setTerm(e.target.value)}
                      />

                      <Button size="sm" colorScheme="blue">
                        Download last outline
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => addTerm(index)}
                      >
                        Add course
                      </Button>
                    </HStack>
                  </Box>
                );
              })}
            </SimpleGrid>
          </SimpleGrid>
        </CardBody>

        <CardFooter m="0" p="0" align="center">
          <Link as={RouterDom} to="/programs">
            <strong>Back to programs...</strong>
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
}
