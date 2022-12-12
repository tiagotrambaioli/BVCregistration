import {
  HStack,
  Text,
  Badge,
  Heading,
  Textarea,
  Select,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { useEffect } from 'react';

export default function FormItem(props) {
  const [comment, setComment] = useState(props.comment || ' ');
  const [status, setStatus] = useState(props.status);
  const cancelRef = React.useRef();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useAuth();

  const handleDelete = async e => {
    onClose();
    const uuid = e.target.value;
    await axios
      .delete(`/questionforms/${uuid}`, {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(response => {
        toast({
          title: 'Success.',
          description: `Form deleted.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setStatus('Deleted');
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

  const handleUpdate = async e => {
    const uuid = e.target.value;
    const data = { uuid, comment, status };
    await axios
      .put('/questionforms', data, {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        toast({
          title: 'Success.',
          description: `Form updated.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
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

  useEffect(() => {}, [status]);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton w="100%">
          <Box flex="1" textAlign="left">
            <strong>From:</strong> {props.firstName} {props.lastName}
          </Box>
          <Box flex="1" textAlign="left">
            <strong>Date:</strong> {props.date}
          </Box>
          <Box flex="1" textAlign="left">
            {status === 'Completed' && (
              <Badge colorScheme="green">Completed</Badge>
            )}
            {status === 'Pending' && <Badge colorScheme="red">Pending</Badge>}
            {status === 'New' && <Badge colorScheme="purple">New</Badge>}
            {status === 'Deleted' && <Badge colorScheme="black">Deleted</Badge>}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text>
          <strong>Message:</strong> {props.message}
        </Text>

        {status === 'Deleted' && (
          <Alert status="error" mt="5">
            <AlertIcon />
            <AlertTitle>Message deleted!</AlertTitle>
            <AlertDescription>
              The next time this page is refreshed you will no longer be able to
              see this message. If you deleted it by mistake, write down the
              information before leaving this screen..
            </AlertDescription>
          </Alert>
        )}
        {status !== 'Deleted' && (
          <>
            <Heading my="5" size="sm">
              Add comments (Only admins can read this):
            </Heading>
            <Textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
            ></Textarea>
            <HStack flex="1" textAlign="left" my="5" justify="flex-end">
              <Heading my="5" size="sm">
                Status:
              </Heading>
              <Select w="10rem" onChange={e => setStatus(e.target.value)}>
                <option value={props.status} selected>
                  {props.status}
                </option>
                {props.status !== 'New' && <option value="New">New</option>}
                {props.status !== 'Pending' && (
                  <option value="Pending">Pending</option>
                )}
                {props.status !== 'Completed' && (
                  <option value="Completed">Completed</option>
                )}
              </Select>
              <Button
                value={props.uuid}
                colorScheme="blue"
                onClick={handleUpdate}
              >
                Update
              </Button>

              <Button colorScheme="red" onClick={onOpen}>
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
                      Delete message?
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
                        onClick={handleDelete}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </HStack>
          </>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
