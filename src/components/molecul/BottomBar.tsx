import { Box, HStack, VStack, Icon, Text, Pressable } from "native-base";
import { For } from "../../libs/component";
import React, { memo, useMemo } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useTabBarStore } from "../../services/useTabBarStore";

type State = {
    index: number,
    routes?: Array<{ key: string, name: string, params: Record<string, any> }>
}

type Descriptors = {
    options: {
        title?: string
        icon?: string
        showTabBar?: boolean
        [key: string] : any;
    }
    render: () => React.ReactNode
    [key: string]: any
}

type Navigation = {
    navigate: (routeName: string, params?: Record<string, any>) => void;
    emit: (event: {
        type: string;
        target?: string;
        canPreventDefault?: boolean;
    }) => { defaultPrevented: boolean };
    [key: string]: any;
}

type BottomTabType = {
    state: State,
    descriptors: Descriptors,
    navigation: Navigation
}

const BottomTabs = memo(({ state, descriptors, navigation }: BottomTabType) => {
    const tabMenus: any = useMemo(() =>
        state.routes?.filter(route => {
            const { options } = descriptors[route.key];
            return options.showTabBar !== false;
        }),
        [state.routes, descriptors]
    );

    return (
        <Box py={2} px={4} bg={"green.900"} shadow={2}>
            <HStack justifyContent={"space-evenly"} alignItems={"center"}>
                <For each={tabMenus} render={(route: string, index: number) => {
                    const { options } = descriptors[route.key];

                    const isFocused = state.index === index;
                    
                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true
                        })

                        if(!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name)
                        }
                    }

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key
                        })
                    }

                    return (
                        <Pressable key={index} onPress={onPress} onLongPress={onLongPress} alignItems={"center"}>
                            {isFocused ? (
                                <VStack alignItems={"center"}>
                                    <Box rounded={"md"} bg={"green.400"} justifyContent={'center'} mb={1} alignItems={"center"} w={"10"} h={10}>
                                        <Icon as={FontAwesome} name={options.icon} size={6} color={"white"} />
                                    </Box>
                                    <Text fontSize={10} fontWeight={"medium"} color={"white"}>{options.title}</Text>
                                </VStack>
                            ) : (
                                <VStack alignItems={"center"}>
                                    <Icon as={FontAwesome} name={options.icon} size={"6"} color={"green.400"} mb={1} />
                                    <Text color={"white"} fontSize={"10"}>{options.title}</Text>
                                </VStack>
                            )}
                        </Pressable>
                    )
                }}>

                </For>
            </HStack>
        </Box>
    )
})

export default BottomTabs