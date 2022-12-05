import React from 'react';
import { Button, Link } from '@chakra-ui/react';
import { Link as RouterDom } from 'react-router-dom';
import { IoSchool, IoBook, IoHome, IoMail, IoPerson } from 'react-icons/io5';

export default function NavBarItem(props) {
  return (
    <Link as={RouterDom} to={props.to}>
      {!props.icon && (
        <Button variant={props.variant || 'ghost'} size={props.size || 'md'}>
          {props.text}
        </Button>
      )}
      {props.icon == 'IoHome' && (
        <Button
          leftIcon={<IoHome />}
          variant={props.variant || 'ghost'}
          size={props.size || 'md'}
          m={props.m || '2'}
        >
          {props.text}
        </Button>
      )}
      {props.icon == 'IoSchool' && (
        <Button
          leftIcon={<IoSchool />}
          variant={props.variant || 'ghost'}
          size={props.size || 'md'}
          m={props.m || '2'}
        >
          {props.text}
        </Button>
      )}
      {props.icon == 'IoBook' && (
        <Button
          leftIcon={<IoBook />}
          variant={props.variant || 'ghost'}
          size={props.size || 'md'}
          m={props.m || '2'}
        >
          {props.text}
        </Button>
      )}
      {props.icon == 'IoMail' && (
        <Button
          leftIcon={<IoMail />}
          variant={props.variant || 'ghost'}
          size={props.size || 'md'}
          m={props.m || '2'}
        >
          {props.text}
        </Button>
      )}
      {props.icon == 'IoPerson' && (
        <Button
          leftIcon={<IoPerson />}
          variant={props.variant || 'ghost'}
          size={props.size || 'md'}
          m={props.m || '2'}
        >
          {props.text}
        </Button>
      )}
    </Link>
  );
}
