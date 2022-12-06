import React from 'react';
import { Button, Card, CardBody } from '@chakra-ui/react';

export default function CategoryButton(props) {
  return (
    <Card fontWeight="extrabold">
      <CardBody>
        <Button
          color="blue.900"
          variant="link"
          value={props.value}
          onClick={props.handler}
        >
          {props.value}
        </Button>
      </CardBody>
    </Card>
  );
}
