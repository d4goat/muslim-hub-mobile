import { Text, HStack, VStack, Container, ScrollView, Skeleton } from "native-base";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";

const Index = React.memo(() => {
    return (
        <Container bg={"green.200"} w={"100%"} h={"100%"} maxW={"100%"}>
            <ScrollView w={"100%"} h={"100%"} contentContainerStyle={{ flex: 1 }}>
                <Text>tes</Text>
            </ScrollView>
        </Container>
    )
})

export default Index