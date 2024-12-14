import { NativeBaseProvider, extendTheme } from "native-base"
import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import {  createNativeStackNavigator } from "@react-navigation/native-stack"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const { Navigator, Screen } = createNativeStackNavigator()
import Index from "./src/screens/Index";

const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-Light",
      },
      200: {
        normal: "Poppins-Light",
      },
      300: {
        normal: "Poppins-Light",
      },
      400: {
        normal: "Poppins-Regular",
      },
      500: {
        normal: "Poppins-Medium",
      },
      600: {
        normal: "Poppins-SemiBold",
      },
      700: {
        normal: "Poppins-Bold",
      },
    },
  },
  colors: {
    brand: {
      100: "#aefbf8",
      200: '#3ae0d9',
      300: '#25dbd4',
      400: "#0BB7AF",
      700: "#036964",
    },
  },

  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      retry: false,
      networkMode: "always"
    },
    mutations: {
      retry: false,
      networkMode: "always"
    }
  }
})

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Index/>
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  )
}

export default App