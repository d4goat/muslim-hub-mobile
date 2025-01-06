import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { Navigator, Screen } = createBottomTabNavigator()
import { useTabBarStore } from "../../services/useTabBarStore";
import BottomTabs from "../../components/molecul/BottomBar";

import Views from "./home/Views";

import MainHeader from "../../components/molecul/MainHeader";

const Index = () => {
  const { tabBar, setTabBar } = useTabBarStore()
return (
  <Navigator tabBar={tabBar ? props => <BottomTabs {...props}/> : () => null} initialRouteName="dashboard.views">
    <Screen name="dashboard.views" component={Views} options={{ header: () => <MainHeader/>, icon: "home", title: "Dashboard" }} />
    <Screen name="dashboard.home" component={Views} options={{ header: () => <MainHeader/>, icon: "home", title: "Dashboard" }} />
    <Screen name="dashboard.viewss" component={Views} options={{ header: () => <MainHeader/>, icon: "home", title: "Dashboard" }} />
  </Navigator>
  )
}

export default Index