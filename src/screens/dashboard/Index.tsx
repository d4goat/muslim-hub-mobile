import {
  Text,
  HStack,
  VStack,
  Container,
  ScrollView,
  Skeleton,
  Box,
  Icon,
} from 'native-base';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Sun} from 'lucide-react-native';
import axios from '../../libs/axios';
import LocationComponent from '../../services/Location';
import {FeatureGrid} from '../../components/molecul/FeatureGrid';
import {useUserLocation} from '../../services/Location';

const Index = React.memo(() => {
  const {location, city} = useUserLocation();
  const [date, setDate] = React.useState(new Date())


  const PrayerTimes = () => {
    // In a real app, you'd fetch actual prayer times based on location
    const prayerTimes = [
      {name: 'Subuh', time: '04:30'},
      {name: 'Dzuhur', time: '12:15'},
      {name: 'Ashar', time: '15:45'},
      {name: 'Maghrib', time: '18:30'},
      {name: 'Isya', time: '19:45'},
    ];

    return (
      <Box bg="white" borderRadius={10} p={4} shadow={2}>
        <HStack justifyContent="space-between" alignItems="center" mb={3}>
          <Text fontSize="lg" fontWeight="bold">
            Jadwal Sholat Hari Ini
          </Text>
          <HStack alignItems="center" space={2}>
            <Text>{date}</Text>
          </HStack>
        </HStack>
        <VStack space={3}>
          {prayerTimes.map((prayer, index) => (
            <HStack
              key={index}
              justifyContent="space-between"
              alignItems="center"
              borderBottomWidth={index < prayerTimes.length - 1 ? 1 : 0}
              borderBottomColor="gray.200"
              pb={3}>
              <Text color="gray.700">{prayer.name}</Text>
              <Text fontWeight="bold" color="green.700">
                {prayer.time}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    );
  };

  if (!location && !city) {
    return (
      <Container w={'100%'} maxW={'100%'} h={'100%'} bg={'green.200'} px={4}>
        <ScrollView
          w={'100%'}
          h={'100%'}
          py={4}
          contentContainerStyle={{flexGrow: 1}}>
          <Skeleton w={'100%'} h={'24'} mb={4} rounded={'md'} />
          <Skeleton w={'100%'} h={'24'} mb={4} rounded={'md'} />
          <Skeleton w={'100%'} h={'24'} mb={4} rounded={'md'} />
        </ScrollView>
      </Container>
    );
  }

  return (
    <Container bg={'green.200'} w={'100%'} h={'100%'} maxW={'100%'} px={4}>
      <ScrollView
        w={'100%'}
        h={'100%'}
        contentContainerStyle={{flexGrow: 1}}
        py={2}>
        <VStack space={5}>
          <Text fontSize={32} fontWeight={'semibold'} color={'green.800'}>
            Assalamu'alaikum
          </Text>

          <PrayerTimes />

          <FeatureGrid />
        </VStack>
      </ScrollView>
    </Container>
  );
});

export default Index;
