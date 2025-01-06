import { create } from "zustand"

const useTabBarStore = create(set => ({
    tabBar: true,
    setTabBar: (state: boolean) => set({ tabBar: state }),
    tabBarStyle: {},
    setTabBarStyle: (style: any) => set({ setTabBarStyle: style })
}))

export { useTabBarStore }