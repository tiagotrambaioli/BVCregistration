import { Accordion, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useApiGet } from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';
import FormItem from './FormItem';

export default function ViewForms() {
  const { auth } = useAuth();
  const { data: forms } = useApiGet('/questionforms', '*', {
    headers: {
      authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return (
    <>
      <Heading align="center" size="md" m="5">
        Received contact forms
      </Heading>
      <VStack w="90vw" align="center" justify="center" m="0 auto">
        <Accordion allowToggle w="100%">
          {forms.map((form, index) => {
            return (
              <FormItem
                key={index}
                firstName={form.userFirstName}
                lastName={form.userLastName}
                date={form.createdAt}
                status={form.status}
                message={form.message}
                uuid={form.uuid}
                comment={form.comment}
              />
            );
          })}
        </Accordion>
      </VStack>
    </>
  );
}
