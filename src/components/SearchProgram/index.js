import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useApiGet } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import CategoryButton from './CategoryButton';
import ProgramDisplay from './ProgramDisplay';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

export default function SearchProgram(props) {
  const [search, setSearch] = useState('');
  const [searchParam, setSearchParam] = useState(props?.search);
  const { data: programs } = useApiGet('/programs', searchParam);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSearch = e => {
    setSearch(e.target.value);
    setSearchParam(e.target.value);
  };

  const handleCategory = e => {
    setSearchParam(e.target.value);
  };

  const handleDelete = async e => {
    const uuid = e.target.value;
    const programIndex = programs.findIndex(program => program.uuid === uuid);

    await axios
      .delete(`/programs/${uuid}`, {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(response => {
        toast({
          title: 'Success.',
          description: `Program deleted.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        programs.splice(programIndex, 1);
        setSearch(current => `${current}    `);
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

  return (
    <VStack width="100vw" align="center" my="10">
      {auth?.role === 'admin' && (
        <Button
          mb="3"
          colorScheme="blue"
          onClick={() => {
            navigate('/programs/create');
          }}
        >
          Create program
        </Button>
      )}
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

      {programs.length === 0 && search.length > 0 && (
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
      <SimpleGrid w="90vw" spacing={4} columns={2} alignItems="center">
        {programs?.map((program, index) => {
          return (
            <ProgramDisplay
              key={index}
              uuid={program?.uuid}
              title={program?.title}
              subtitle={program?.subtitle}
              duration={program?.duration}
              deliveryTypes={program?.deliveryTypes}
              handleDelete={handleDelete}
            />
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}
