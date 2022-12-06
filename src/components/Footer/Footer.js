import React from 'react';
import {
  Grid,
  GridItem,
  Divider,
  Box,
  Center,
  Heading,
  Text,
  Icon,
  Button,
  Link,
  VStack,
} from '@chakra-ui/react';
import Logo from '../../assets/Logo';
import {
  IoMail,
  IoCall,
  IoPin,
  IoMap,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
} from 'react-icons/io5';

export default function Footer() {
  return (
    <>
      <Grid
        mt="20"
        p="1"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        bg="blue.900"
      >
        <GridItem rowSpan={1} colSpan={1} align="center">
          <Center color="white" fontSize="5xl" fontWeight="bold" h="100%">
            Boosting people.
          </Center>
        </GridItem>
        <GridItem
          colSpan={2}
          p="3"
          borderLeft="1px solid RGBA(255, 255, 255, 0.08)"
        >
          <Heading size="lg" color="white">
            Contact us
          </Heading>
          <VStack align="start" justify="center" m="3">
            <Button
              color="white"
              leftIcon={<IoMail />}
              variant="link"
              size="lg"
            >
              <Link href="mailto:info@bowvalleycollege.ca" isExternal>
                info@bowvalleycollege.ca
              </Link>
            </Button>

            <Button
              color="white"
              leftIcon={<IoCall />}
              variant="link"
              size="lg"
            >
              <Link href="tel:+1-403-410-1400" isExternal>
                +1 (403) 410-1400
              </Link>
            </Button>
            <Button
              color="white"
              leftIcon={<IoCall />}
              variant="link"
              my="1"
              mx="2"
              size="lg"
            >
              <Link href="tel:+1-403-410-1400" isExternal>
                +1 (866) 428-2669 (Toll free)
              </Link>
            </Button>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={2}
          p="3"
          borderLeft="1px solid RGBA(255, 255, 255, 0.08)"
        >
          <Heading size="lg" color="white">
            Visit us
          </Heading>
          <VStack align="start" m="3">
            <Button
              color="white"
              leftIcon={<IoPin />}
              variant="link"
              fontWeight="bold"
              size="md"
            >
              <Link href="https://goo.gl/maps/SdXzjqr3CgeUSHSM9" isExternal>
                Calgary Downtown
              </Link>
            </Button>
            <Button color="white" leftIcon={<IoMap />} variant="link" size="md">
              <Link href="https://goo.gl/maps/SdXzjqr3CgeUSHSM9" isExternal>
                Bow Valley College 345 - 6 Avenue SE, Calgary, AB T2G 4V1
              </Link>
            </Button>
            <Divider />
            <Center gap={7} w="100%" pt="3">
              <Link href="http://www.facebook.com/bowvalleycollege" isExternal>
                <Icon as={IoLogoFacebook} color="white" boxSize="7" />
              </Link>
              <Link href="http://twitter.com/BowValley" isExternal>
                <Icon as={IoLogoTwitter} color="white" boxSize="7" />
              </Link>
              <Link href="https://www.instagram.com/bowvalley/" isExternal>
                <Icon as={IoLogoInstagram} color="white" boxSize="7" />
              </Link>
              <Link
                href="https://www.linkedin.com/school/bow-valley-college"
                isExternal
              >
                <Icon as={IoLogoLinkedin} color="white" boxSize="7" />
              </Link>
            </Center>
          </VStack>
        </GridItem>
      </Grid>
      <Center w="100vw">
        <Text color="blue.800" fontSize="sm" fontWeight="bold">
          Copyright 2022. Bow Valley College. All rights reserved.
        </Text>
      </Center>
    </>
  );
}
