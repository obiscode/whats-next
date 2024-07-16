import React from "react";
import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="shuffle" options={{ headerShown: false }} />
      <Stack.Screen name="focus" options={{ headerShown: false }} />
    </Stack>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
