import React from 'react';
import { Box, HStack, Text, VStack, ScrollView } from 'native-base';
import { FeatureCard } from './FeatureCard';
import type { FeatureCardProps } from './FeatureCard';
import { For } from '../libs/component';

const features: FeatureCardProps[] = [
    {
      title: 'Al Quran',
      description: 'Baca Al-Quran dengan terjemahan',
      image: require("../../assets/images/allah.png")
    },
    {
      title: 'Hadits',
      description: 'Kumpulan hadits shahih',
      image: require("../../assets/images/allah.png")
      
    },
    {
      title: 'Asmaul Husna',
      description: '99 nama Allah',
      image: require("../../assets/images/allah.png")
      
    },
    {
      title: 'Jadwal Sholat',
      description: 'Waktu sholat tepat',
      image: require("../../assets/images/allah.png")
      
    },
    {
      title: 'Doa Harian',
      description: "Kumpulan doa sehari-hari",
      image: require("../../assets/images/allah.png")
      
    },
    {
      title: "Sholawat Nabi",
      description: "Kumpulan sholawat kepada nabi Muhammad SAW",
      image: require("../../assets/images/allah.png")
      
    },
    {
      title: "Bacaan Tahlil",
      description: 'Kumpulan bacaan tahlil',
      image: require("../../assets/images/allah.png")
      
    },
    {
      title: "Kisah Nabi & Rasul",
      description: "Kumpulan kisah para 25 nabi & rasul",
      image: require("../../assets/images/allah.png")
      
    }
  ];

export const FeatureGrid = React.memo(() => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} pb={10} showsVerticalScrollIndicator={false} h={"100%"}>
        <VStack space={4}>
            <For each={features} render={(item: FeatureCardProps, index: any) => (
                <FeatureCard image={item.image} title={item.title} description={item.description} />
            )}></For>
        </VStack>
    </ScrollView>
  );
});