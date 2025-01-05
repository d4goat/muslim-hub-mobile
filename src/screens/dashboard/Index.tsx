import { createNativeStackNavigator } from "@react-navigation/native-stack";
const { Navigator, Screen } = createNativeStackNavigator()

import Views from "./home/Views";

import MainHeader from "../../components/molecul/MainHeader";

const Index = () => (
  <Navigator initialRouteName="dashboard.views">
    <Screen name="dashboard.views" component={Views} options={{ header: () => <MainHeader/> }} />
  </Navigator>
)

export default Index