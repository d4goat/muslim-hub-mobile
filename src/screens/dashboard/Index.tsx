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
import React, { useEffect, useState } from 'react';
import {useQuery} from '@tanstack/react-query';
import {Sun} from 'lucide-react-native';
import axios from '../../libs/axios';
import LocationComponent from '../../services/Location';
import {FeatureGrid} from '../../components/molecul/FeatureGrid';
import {useUserLocation} from '../../services/Location';

interface JadwalSholat {
  date?: string;
  tanggal?: string;
  subuh: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

const Index = React.memo(() => {
  const {location, city} = useUserLocation();
  const [nextTime, setNextTime] = useState<any>([]);
  const [countdown, setCountdown] = useState<string>("");

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
    enabled: !!city
  });

  useEffect(() => {
    let interval: any;

    const calculateCountdown = () => {
      if (!prayerTimes) return;

      const now = new Date();
      const times = [
        { name: "Subuh", time: prayerTimes.jadwal.subuh },
        { name: "Dzuhur", time: prayerTimes.jadwal.dzuhur },
        { name: "Ashar", time: prayerTimes.jadwal.ashar },
        { name: "Maghrib", time: prayerTimes.jadwal.maghrib },
        { name: "Isya", time: prayerTimes.jadwal.isya },
      ];

      const upcomingTimes = times
        .map(({ name, time }) => {
          const [hour, minute] = time.split(":").map(Number);
          const sholatTime = new Date();
          sholatTime.setHours(hour, minute, 0, 0);
          if (sholatTime < now) sholatTime.setDate(sholatTime.getDate() + 1); // Jika waktu sudah lewat, set untuk besok
          return { name, time: sholatTime };
        })
        .sort((a, b) => a.time.getTime() - b.time.getTime());

      setNextTime(upcomingTimes[0]);

      const diff = upcomingTimes[0].time - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`
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


  if (isLoading) {
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

          <Box bg="white" borderRadius={10} p={4} shadow={2}>
            <HStack justifyContent="space-between" alignItems="center" mb={3}>
              <Text fontSize="lg" fontWeight="bold">
                Kota {city}
              </Text>
              <HStack alignItems="center" space={2}>
                <Text>{prayerTimes?.jadwal.tanggal}</Text>
              </HStack>
            </HStack>
            <VStack space={3}>
              <Text>Menuju Waktu Sholat {nextTime.name}</Text>
              <Text>{countdown}</Text>
            </VStack>
          </Box>

          <FeatureGrid />
        </VStack>
      </ScrollView>
    </Container>
  );
});

export default Index;
