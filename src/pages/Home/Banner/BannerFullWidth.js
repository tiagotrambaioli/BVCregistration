import React from 'react';
import { Container, Heading } from '@chakra-ui/react';

export default function BannerFullWidth() {
  return (
    <Container
      bgImage="url(
        'http://www.bowvalleycollege.ca/-/media/bvc/home-page/home-page-hero-banners/homepage_image_optimized/oh_hero_1800x1000/oh_hero_1800x1000_1/home-page-hero-oct-16/hero-1/hero1/hero2.ashx'
      )"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      maxW="100vw"
      h="60vh"
      centerContent
      justifyContent="center"
    >
      <Heading size="4xl" color="white">
        Welcome to your future.
      </Heading>
    </Container>
  );
}
