import {
  ActivityIndicator,
  Dimensions,
  Platform,
  View,
  Text,
} from "react-native";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowConfetti(true);
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return !showConfetti ? (
    <View
      style={{
        height: screenHeight,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator
        color="#0000ff"
        animating={isLoading}
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  ) : (
    <View
      style={{
        width: 300,
        height: 800,
      }}
    >
      <LottieView
        style={{
          width: 300,
          height: 800,
        }}
        source={require("../assets/confetti.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;
