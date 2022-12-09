import {
  Box,
  Badge,
  Flex,
  Heading,
  VStack,
  Text,
  Button,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  Divider,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function ShowProgram() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const { uuid } = useParams();
  const toast = useToast();
  const [data, setData] = useState();

  const handleProgram = async e => {
    if (!auth?.uuid) {
      toast({
        title: 'Alert!',
        description: `You must be logged in to enroll.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login', { state: { from: location }, replace: true });
      return;
    }
    let input;
    if (e.target.value === 'enroll' && !auth?.program) {
      input = { uuid: auth.uuid, role: auth.role, program: data };
    }
    if (e.target.value === 'drop' && auth && auth?.program.uuid === data.uuid) {
      const { program, ...rest } = auth;
      setAuth(rest);
      input = { uuid: auth.uuid, role: auth.role, program: null };
    }

    try {
      await axios
        .put(`/users`, input, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => setAuth({ ...auth, program: input.program }))
        .catch(err => {
          console.log(err.response.data.msg);
        });

      toast({
        title: 'Done!',
        description: `Thank you ${auth.firstName}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const { program, ...rest } = auth;
      setAuth(rest);
      input = { uuid: auth.uuid, role: auth.role, program: null };
      toast({
        title: 'Something wrong...',
        description: `Try again later ${auth.firstName}.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCourse = async e => {
    let data = {};
    if (!auth?.uuid || !auth?.program?.uuid) {
      toast({
        title: 'Alert!',
        description: `First you must enroll in the program, ${auth.firstName}.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (
      auth?.program?.totalCoursesEnrolled >= 5 &&
      e.target.value === 'enroll'
    ) {
      toast({
        title: 'Alert!',
        description: `You have reached the limit of courses allowed, ${auth.firstName}.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    let program = auth?.program;
    let completedTerms;

    if (e.target.dataset.term > 1) {
      completedTerms = program.terms.filter(
        term =>
          term.term === e.target.dataset.term - 1 && term.isCompleted === true
      ).length;
    }

    if (completedTerms < 3 && e.target.dataset.term > 1) {
      toast({
        title: 'Alert',
        description: `You must complete at least 3 courses of the previous term before advancing..`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const courseIndex = program.terms.findIndex(
      term => term.courseCode === e.target.dataset.code
    );
    if (e.target.value === 'enroll') {
      program.terms[courseIndex].isEnrolled = true;
    }
    if (e.target.value === 'drop') {
      program.terms[courseIndex].isEnrolled = false;
    }

    const enrollCount = program.terms.filter(
      term => term.isEnrolled === true
    ).length;
    program.totalCoursesEnrolled = enrollCount;

    const completedCount = program.terms.filter(
      term => term.isCompleted === true
    ).length;
    program.totalCoursesCompleted = completedCount;

    data = { uuid: auth.uuid, role: auth.role, program };

    try {
      await axios
        .put(`/users`, data, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => setAuth({ ...auth, program }));
      toast({
        title: 'Done!',
        description: `Thank you ${auth.firstName}.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Something wrong...',
        description: `Try again later ${auth.firstName}.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`/programs/${uuid}`)
      .then(response => setData(...response.data))
      .catch(err => {
        console.log(err.response.data.msg);
      });
  }, [auth, uuid]);

  return (
    <>
      <VStack
        m="0 auto"
        align="center"
        justify="center"
        p="10"
        shadow="2xl"
        w="90%"
        borderRadius="sm"
      >
        <Flex
          direction="column"
          w="100%"
          p="10"
          bgImage={`url(${data?.image})`}
          bgColor="gray.400"
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          minH="400px"
          borderRadius="2xl"
          color="white"
        >
          <Heading as="span" size="sm">
            {data?.type}
          </Heading>
          <Heading as="h1">{data?.title}</Heading>
          <Text mt="5" fontSize="2xl" fontWeight="semibold">
            {data?.subtitle}
          </Text>
          <HStack
            alignSelf="flex-end"
            justify="space-between"
            w="100%"
            mt="auto"
          >
            {data?.tuition && (
              <>
                <Heading as="h2" size="md">
                  Tuition ({data?.tuition?.period}):
                </Heading>
                <Text>
                  Domestic: CAD $
                  {data?.tuition?.domestic.toLocaleString('en-CA')}
                </Text>
                <Text>
                  International: CAD $
                  {data?.tuition?.international.toLocaleString('en-CA')}
                </Text>
              </>
            )}

            {!auth?.program?.uuid && (
              <Button
                colorScheme="blue"
                variant="solid"
                size="lg"
                w="20rem"
                value="enroll"
                onClick={handleProgram}
              >
                ENROLL NOW
              </Button>
            )}
            {data?.uuid === auth?.program?.uuid && (
              <Button
                colorScheme="red"
                variant="solid"
                size="lg"
                w="20rem"
                value="drop"
                onClick={handleProgram}
              >
                Drop program
              </Button>
            )}
          </HStack>
        </Flex>
        {data?.terms && (
          <VStack align="flex-start" w="100%" p="10">
            {auth?.program?.totalCoursesEnrolled < 3 && (
              <Alert status="error" alignSelf="center">
                <AlertIcon />
                <AlertTitle>Important notification:</AlertTitle>
                <AlertDescription>
                  You must be enrolled in at least 3 courses and no more than 5.
                </AlertDescription>
              </Alert>
            )}
            <Heading color="blue.900" size="md">
              Courses
            </Heading>
            <Accordion w="100%" allowToggle>
              {(auth?.program?.terms ? auth?.program?.terms : data?.terms).map(
                (term, index) => {
                  return (
                    <AccordionItem key={index}>
                      <h2>
                        <AccordionButton>
                          <HStack textAlign="left" w="100%">
                            {term.isEnrolled && (
                              <Badge colorScheme="blue" mr="1">
                                Enrolled
                              </Badge>
                            )}
                            {term.isCompleted && (
                              <Badge colorScheme="green" mr="1">
                                Completed
                              </Badge>
                            )}
                            <Text>Term: {term.term}</Text>
                            <Heading as="h3" size="sm" flex="1">
                              {term.courseCode} - {term.courseTitle}
                            </Heading>
                            {term?.credits && (
                              <Text>Credits: {term.credits}</Text>
                            )}
                          </HStack>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} px="10">
                        <HStack
                          alignSelf="flex-end"
                          justify="space-between"
                          w="100%"
                          mt="auto"
                        >
                          {term?.courseTuition?.period && (
                            <Heading as="h3" size="sm">
                              Tuition ({term?.courseTuition?.period}):
                            </Heading>
                          )}
                          {term?.courseTuition?.domestic && (
                            <Text>
                              Domestic: CAD $
                              {term?.courseTuition?.domestic.toLocaleString(
                                'en-CA'
                              )}
                            </Text>
                          )}
                          {term?.courseTuition?.international && (
                            <Text>
                              International: CAD $
                              {term?.courseTuition?.international.toLocaleString(
                                'en-CA'
                              )}
                            </Text>
                          )}
                          <Box>
                            {!term.isEnrolled && !term.isCompleted && (
                              <Button
                                my="1"
                                size="sm"
                                colorScheme="blue"
                                value="enroll"
                                data-code={term?.courseCode}
                                data-term={term?.term}
                                onClick={handleCourse}
                              >
                                Enroll
                              </Button>
                            )}
                            {term.isEnrolled && !term.isCompleted && (
                              <Button
                                size="sm"
                                colorScheme="red"
                                value="drop"
                                data-code={term?.courseCode}
                                data-term={term?.term}
                                onClick={handleCourse}
                              >
                                Drop
                              </Button>
                            )}
                          </Box>
                        </HStack>
                        <Divider />
                        {term?.outlines.map((outline, index) => {
                          return (
                            <HStack
                              key={index}
                              align="center"
                              justify="space-between"
                              gap="5"
                              w="100%"
                              my="2"
                            >
                              <Text flex="1">
                                Academic year: {outline.academicYear}
                              </Text>
                              <Text flex="1">
                                Start: {outline.effectiveStartTerm}
                              </Text>
                              <Text flex="1">
                                End: {outline.effectiveTermEnd}
                              </Text>
                              <Box alignSelf="flex-end">
                                <Button size="sm" colorScheme="teal">
                                  <Link isExternal href={outline.url}>
                                    Download outline
                                  </Link>
                                </Button>
                              </Box>
                            </HStack>
                          );
                        })}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                }
              )}
            </Accordion>
          </VStack>
        )}
      </VStack>
    </>
  );
}
