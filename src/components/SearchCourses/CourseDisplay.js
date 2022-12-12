import React from 'react';
import {
  ScaleFade,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  Button,
  Link,
  HStack,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';
import { Link as RouterDom, useNavigate } from 'react-router-dom';

export default function CourseDisplay(props) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <ScaleFade initialScale={0.9} in={props}>
      <Card shadow="lg">
        <CardHeader color="blue.900" mt="2">
          <HStack justify="space-between">
            <Heading as="h2" size="md">
              {props.courseCode} - {props.courseName}
            </Heading>
            <Text flexShrink="0">
              <strong>Credits: {props.courseCredits}</strong>
            </Text>
          </HStack>
        </CardHeader>
        <CardBody color="blue.900" mt="-5">
          {props?.tuition && (
            <HStack my="2" justify="space-between">
              <Heading as="h3" size="md">
                Tuition
              </Heading>
              <Text>
                <strong>Period: </strong> {props.tuition.period}
              </Text>
              <Text>
                <strong>Domestic: </strong> CAD $
                {props.tuition.domestic.toLocaleString('en-CA')}
              </Text>
              <Text>
                <strong>International: </strong> CAD $
                {props.tuition.international.toLocaleString('en-CA')}
              </Text>
            </HStack>
          )}
          {props.outlines?.map((outline, index) => {
            return (
              <HStack
                key={index}
                align="center"
                justify="space-between"
                gap="5"
                w="100%"
                my="1"
              >
                <Text flex="1">Academic year: {outline.academicYear}</Text>
                <Text flex="1">Start: {outline.effectiveStartTerm}</Text>
                <Text flex="1">End: {outline.effectiveTermEnd}</Text>
                <Box alignSelf="flex-end">
                  <Button size="xs" colorScheme="teal">
                    <Link isExternal href={outline.url}>
                      Download outline
                    </Link>
                  </Button>
                </Box>
              </HStack>
            );
          })}
        </CardBody>
        {auth?.role === 'admin' && (
          <CardFooter align="right" color="blue.900" justify="flex-end">
            <HStack w="30%" justify="flex-end" align="flex-end">
              <Button
                flexGrow="1"
                size="sm"
                colorScheme="blue"
                onClick={e => {
                  navigate(`/courses/update/${props.courseCode}`);
                }}
              >
                Edit
              </Button>

              <Button flexGrow="1" size="sm" colorScheme="red" onClick={onOpen}>
                Delete
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete course?
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        value={props.uuid}
                        colorScheme="red"
                        onClick={e => {
                          onClose();
                          props.handleDelete(e);
                        }}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </HStack>
          </CardFooter>
        )}
      </Card>
    </ScaleFade>
  );
}
