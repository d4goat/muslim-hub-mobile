import React from 'react';
import {Box, HStack, Text, VStack, Image} from 'native-base';

interface FeatureCardProps {
  title: string;
  description: string;
  image: any
}

export const FeatureCard = React.memo(
  ({title, description, image}: FeatureCardProps) => {
    return (
      <Box bg={'white'} shadow={'2'} mb={4} p={4} rounded={'lg'}>
        <HStack space={6} alignItems={"center"}>
            <Image w={"16"} h={"16"} resizeMode='contain' source={image} />
          <VStack>
            <Text fontSize={"xl"} fontWeight={'bold'} color={'emerald.700'}>
              {title}
            </Text>
            <Text fontSize={'sm'} color={'gray.600'}>
              {description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    );
  },
);

export type {FeatureCardProps};
