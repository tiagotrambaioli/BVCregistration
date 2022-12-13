import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Link,
  Divider,
  Box,
} from '@chakra-ui/react';
import student from '../../../assets/student.jpg';
import student1 from '../../../assets/student1.jpg';
import learning from '../../../assets/learning.jpg';
import campus from '../../../assets/campus.jpg';

export default function Why() {
  return (
    <SimpleGrid
      columns={2}
      spacing={5}
      w="90%"
      mt="20"
      mx="auto"
      alignContent="center"
      justifyItems="center"
    >
      <Heading as="h1" gridColumn="span 2" mb="20">
        Why Bow Valley College?
      </Heading>
      <Card direction="row-reverse" overflow="hidden" variant="outline">
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={student1}
          alt="student"
        />

        <Stack>
          <CardBody>
            <Heading size="md">Current students</Heading>

            <Text py="2">
              Student Services provides resources to enhance the student
              experience and support academic success at Bow Valley College.
              From student engagement to personal and academic support, and
              Indigenous support programs and services, we are ready to help.
            </Text>
          </CardBody>

          <CardFooter>
            <Link
              isExternal
              href="https://bowvalleycollege.ca/student-resources/learner-success-services"
            >
              Learn more (BVC oficial website)
            </Link>
          </CardFooter>
        </Stack>
      </Card>

      <Card direction="row" overflow="hidden" variant="outline">
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={student}
          alt="Student"
        />

        <Stack>
          <CardBody>
            <Heading size="md">International students</Heading>

            <Text py="2">
              We support International Students in achieving their dreams
              through academic and student-life experiences. Our dedicated and
              experienced instructors and staff help provide the skills you need
              to live, study, and work in Alberta.
            </Text>
          </CardBody>

          <CardFooter>
            <Link
              isExternal
              href="https://bowvalleycollege.ca/schools/international-education"
            >
              Learn more (BVC oficial website)
            </Link>
          </CardFooter>
        </Stack>
      </Card>

      <Card direction="row-reverse" overflow="hidden" variant="outline">
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={learning}
          alt="student"
        />

        <Stack>
          <CardBody>
            <Heading size="md">Continuing learning</Heading>

            <Text py="2">
              You are ready to continue your educational journey, and we are
              here to help. From one course to certificates, we have options for
              you.
            </Text>
          </CardBody>

          <CardFooter>
            <Link
              isExternal
              href="https://bowvalleycollege.ca/schools/continuing-learning"
            >
              Learn more (BVC oficial website)
            </Link>
          </CardFooter>
        </Stack>
      </Card>

      <Card direction="row" overflow="hidden" variant="outline">
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={campus}
          alt="campus"
        />

        <Stack>
          <CardBody>
            <Heading size="md">Regional campuses</Heading>

            <Text py="2">
              Get the benefits of a city college without a city commute.
              Regional campuses in Airdrie, Cochrane, and Okotoks provide
              service to those communities and their surrounding areas.
            </Text>
          </CardBody>

          <CardFooter>
            <Link
              isExternal
              href="https://bowvalleycollege.ca/schools/regional-stewardship"
            >
              Learn more (BVC oficial website)
            </Link>
          </CardFooter>
        </Stack>
      </Card>

      <Card
        direction="row-reverse"
        overflow="hidden"
        variant="outline"
        gridColumn="span 2"
        w="60%"
      >
        <Stack>
          <CardBody>
            <Heading size="md" textAlign="center">
              One of the top 50 Research Colleges in Canada
            </Heading>

            <Text py="2">
              According to Research Infosource. Our Research and Innovation
              department offers expertise to build capacity and promote applied
              research, teaching excellence, curriculum design, and workforce
              development.
            </Text>
          </CardBody>

          <CardFooter>
            <Link
              isExternal
              href="https://bowvalleycollege.ca/teaching-and-research/research-and-innovation"
            >
              Learn more (BVC oficial website)
            </Link>
          </CardFooter>
        </Stack>
      </Card>
      <Divider gridColumn="span 2" />
      <Box
        gridColumn="span 2"
        w="100vw"
        align="center"
        bg="gray.100"
        p="20"
        shadow="lg"
      >
        <Heading as="h2" my="10">
          What are you waiting for?
        </Heading>
        <Text py="2" w="60%" fontSize="2xl">
          Start your journey now by browsing programs and courses, enroll and
          take the first step towards a bright future! We offer a wide variety
          of programs, courses and opportunities. You are one step away from
          becoming what you most desire! See you soon?
        </Text>
      </Box>
    </SimpleGrid>
  );
}
