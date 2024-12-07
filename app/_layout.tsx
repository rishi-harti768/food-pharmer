import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: "Home",
            headerStyle: {
              backgroundColor: "#4582b5",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            statusBarStyle: "dark",
            statusBarBackgroundColor: "#4582b5",
            navigationBarColor: "white",
          }}
        />
        <Stack.Screen
          name="new-report"
          options={{
            headerShown: false,
            statusBarStyle: "dark",
            statusBarBackgroundColor: "#4582b5",
            navigationBarColor: "white",
          }}
        />
        <Stack.Screen
          name="uploadimage/[img]"
          options={{
            headerShown: true,
            title: "Upload Image",
            headerStyle: {
              backgroundColor: "#4582b5",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            statusBarStyle: "dark",
            statusBarBackgroundColor: "#4582b5",
            navigationBarColor: "white",
          }}
        />
      </Stack>
    </>
  );
}
