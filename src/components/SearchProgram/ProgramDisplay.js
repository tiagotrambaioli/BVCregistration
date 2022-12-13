import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Link,
  Button,
  HStack,
  ScaleFade,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterDom, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function ProgramDisplay(props) {
  const location = useLocation();
  const { auth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <ScaleFade initialScale={0.9} in={props}>
      <Card shadow="lg">
        <CardHeader color="blue.900">
          <Heading size="md"> {props.title}</Heading>
          {props.duration && <Text>Duration: {props.duration} </Text>}
        </CardHeader>
        <CardBody color="blue.900">
          <Text>{props.subtitle}</Text>
        </CardBody>
        <CardFooter align="center" color="blue.900">
          <HStack w="100%" justify="space-between">
            <Link as={RouterDom} to={`/programs/${props.uuid}`}>
              <Button>View here</Button>
            </Link>

            {props.deliveryTypes.length > 0 && (
              <Text fontSize="sm">
                Delivery: {props.deliveryTypes.join(', ')}
              </Text>
            )}

            {auth?.role === 'admin' && (
              <HStack w="30%" justify="flex-end" align="flex-end">
                <Link
                  as={RouterDom}
                  to={`/programs/update/${props.uuid}`}
                  textAlign="left"
                >
                  <Button size="sm" colorScheme="blue">
                    Edit
                  </Button>
                </Link>
                // delete course
                <Button
                  flexGrow="1"
                  size="sm"
                  colorScheme="red"
                  onClick={onOpen}
                >
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
            )}
          </HStack>
        </CardFooter>
      </Card>
    </ScaleFade>
  );
}
