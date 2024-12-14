import { Text, HStack, VStack, Container, ScrollView, Skeleton } from "native-base";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import { FeatureGrid } from "../../component/FeatureGrid";

const Index = React.memo(() => {
    return (
        <Container bg={"green.200"} w={"100%"} h={"100%"} maxW={"100%"} px={4}>
            <ScrollView w={"100%"} h={"100%"} contentContainerStyle={{ flexGrow: 1 }} py={2}>
                <VStack space={4}>
                    <Text fontSize={32} fontWeight={"semibold"} color={"green.800"}>Selamat Datang di Muslim Hub</Text>
                    <FeatureGrid/>
                </VStack>
            </ScrollView>
        </Container>
    )
})

export default Index