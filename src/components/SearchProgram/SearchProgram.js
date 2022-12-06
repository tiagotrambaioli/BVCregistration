import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
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
import CategoryButton from './CategoryButton';
import ProgramDisplay from './ProgramDisplay';

export default function SearchProgram() {
  const [search, setSearch] = useState('');
  const [searchParam, setSearchParam] = useState('Business');
  const {
    data: programs,
    isFetching,
    error,
  } = useApiGet('/programs', searchParam);

  const handleSearch = e => {
    setSearch(e.target.value);
    setSearchParam(e.target.value);
  };

  const handleCategory = e => {
    setSearchParam(e.target.value);
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

      {programs.length == 0 && search.length > 0 && (
        <Box mt="2">No results found.</Box>
      )}

      <Stack
        direction="row"
        w="80vw"
        align="center"
        justify="center"
        wrap="wrap"
      >
        <CategoryButton value="Business" handler={handleCategory} />
        <CategoryButton value="Technology" handler={handleCategory} />
        <CategoryButton value="Community Studies" handler={handleCategory} />
        <CategoryButton value="Health and Wellness" handler={handleCategory} />
        <CategoryButton
          value="Careers in Immigrant Advancement"
          handler={handleCategory}
        />
        <CategoryButton value="Academic Upgrading" handler={handleCategory} />
      </Stack>
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
