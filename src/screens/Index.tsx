import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const { Navigator, Screen } = createNativeStackNavigator()

import Dashboard from "./dashboard/Index";

const Index = React.memo(() => {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="dashboard">
            <Screen name="dashboard" component={Dashboard} />
        </Navigator>
    )
})

export default Index