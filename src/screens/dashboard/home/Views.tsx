import {
  Text,
  HStack,
  VStack,
  Container,
  ScrollView,
  Skeleton,
  Box,
  Icon,
  Divider,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ApiResponse} from '../../../types';
import {useQuery} from '@tanstack/react-query';
import axios from '../../../libs/axios';
import {FeatureGrid} from '../../../components/molecul/FeatureGrid';
import {useUserLocation} from '../../../services/Location';
import { useTabBarStore } from '../../../services/useTabBarStore';

interface JadwalSholat {
  date?: string;
  tanggal?: string;
  subuh: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

const Views = React.memo(() => {
  const {location, city} = useUserLocation();
  const [nextTime, setNextTime] = useState<any>([]);
  const [countdown, setCountdown] = useState<string>('');

  const {data: prayerTimes, isLoading} = useQuery({
    queryKey: ['prayer-time'],
    queryFn: async () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const kota = await axios
        .get(`https://api.myquran.com/v2/sholat/kota/cari/${city}`)
        .then(res => res.data.data);

      return await axios
        .get(
          `https://api.myquran.com/v2/sholat/jadwal/${kota[0].id}/${year}/${month}/${day}`,
        )
        .then(res => res.data.data);
    },
    onError: (err: any) => console.error(err.response.data.message),
    enabled: !!city,
  });

  const {data: hijrDate, isLoading: isLoadingHijr} = useQuery({
    queryKey: ['calendar', 'hijriyah'],
    queryFn: async () => {
      const selectedDate = new Date();
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');

      return await axios
        .get(`https://api.myquran.com/v2/cal/hijr/${year}-${month}-${day}`)
        .then((res: any) => res.data.data);
    },
  });

  useEffect(() => {
    let interval: any;

    const calculateCountdown = () => {
      if (!prayerTimes) return;

      const now: any = new Date();
      const times = [
        {name: 'Subuh', time: prayerTimes.jadwal.subuh},
        {name: 'Dzuhur', time: prayerTimes.jadwal.dzuhur},
        {name: 'Ashar', time: prayerTimes.jadwal.ashar},
        {name: 'Maghrib', time: prayerTimes.jadwal.maghrib},
        {name: 'Isya', time: prayerTimes.jadwal.isya},
      ];

      const upcomingTimes: any = times
        .map(({name, time}) => {
          const [hour, minute] = time.split(':').map(Number);
          const sholatTime = new Date();
          sholatTime.setHours(hour, minute, 0, 0);
          if (sholatTime < now) sholatTime.setDate(sholatTime.getDate() + 1); // Jika waktu sudah lewat, set untuk besok
          return {name, time: sholatTime};
        })
        .sort((a, b) => a.time.getTime() - b.time.getTime());

      setNextTime(upcomingTimes[0]);

      const diff = upcomingTimes[0].time - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(
          2,
          '0',
        )} : ${String(seconds).padStart(2, '0')}`,
      );
    };

    if (prayerTimes) {
      calculateCountdown();
      interval = setInterval(calculateCountdown, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [prayerTimes]);

  if (isLoading && isLoadingHijr) {
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
        py={4}>
        <VStack justifyContent={'center'} space={5}>
          <Box bg="white" borderRadius={10} p={4} shadow={2}>
            <VStack alignItems="center">
              <View alignItems={'center'}>
                <Text fontSize="2xl" fontWeight="semibold">
                  Kota {city}
                </Text>
                <View
                  alignSelf={'stretch'}
                  alignItems={'center'}
                  px={3}
                  my={1.5}>
                  <Divider bg={'muted.600'} />
                </View>
              </View>
              <Text fontWeight={"medium"}>{prayerTimes?.jadwal.tanggal}</Text>
              <Text fontWeight={"medium"}>{hijrDate?.date[1]}</Text>
              <VStack space={2} alignItems={"center"}>
              <Text fontSize={"lg"} textTransform={"capitalize"} fontWeight={"medium"}>Menuju waktu sholat {nextTime.name}</Text>
              <Text fontSize={"lg"} fontWeight={"medium"}>{countdown}</Text>
            </VStack>
            </VStack>
          </Box>
          <FeatureGrid />
        </VStack>
      </ScrollView>
    </Container>
  );
});

export default Views;
