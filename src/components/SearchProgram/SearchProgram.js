import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useApiGet } from '../../hooks/useApi';
import ProgramDisplay from './ProgramDisplay';

export default function SearchProgram() {
  const [search, setSearch] = useState('');
  const { data: programs, isFetching, error } = useApiGet('/programs', search);

  console.log(programs);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <VStack width="100vw" align="center" mt="10">
      <InputGroup w="60vw">
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearch color="#718096" />}
        />
        <Input
          value={search}
          onChange={handleSearch}
          placeholder="Search programs..."
        />
      </InputGroup>

      {programs.length > 0 && <Box mt="2">Search results:</Box>}
      {programs.length == 0 && search.length > 0 && (
        <Box mt="2">No results found.</Box>
      )}

      <Stack></Stack>
      <SimpleGrid
        w="90vw"
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(500px, 1fr))"
        alignItems="center"
      >
        {programs?.map((program, index) => {
          return (
            <ProgramDisplay
              key={index}
              uuid={program?.uuid}
              title={program?.title}
              subtitle={program?.subtitle}
              duration={program?.duration}
              deliveryTypes={program?.deliveryTypes}
            />
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}
