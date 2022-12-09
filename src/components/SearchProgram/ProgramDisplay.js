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
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterDom, useLocation } from 'react-router-dom';

export default function ProgramDisplay(props) {
  const location = useLocation();

  return (
    <ScaleFade initialScale={0.9} in={props}>
      <Card shadow="lg">
        <CardHeader color="blue.900">
          <Heading size="md"> {props.title}</Heading>
          {props.duration && <Text>Duration: {props.duration} Terms</Text>}
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
          </HStack>
        </CardFooter>
      </Card>
    </ScaleFade>
  );
}
