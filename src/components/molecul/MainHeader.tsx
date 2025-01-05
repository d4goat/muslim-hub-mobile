import { Box, Heading } from "native-base";
import React from "react";

const MainHeader = () => ( 
    <Box bg={"green.800"} shadow={2} safeAreaTop p={4} flexDir={"row"}>
            <Heading size={"lg"} fontWeight={"semibold"} color={"white"} ml={2}>Go Hijrah</Heading>
    </Box>
)

export default React.memo(MainHeader)