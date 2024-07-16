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
      }, 100);

      return () => clearTimeout(timer); // Cleanup timer on unmount or isLoading change
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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LottieView source={require("../assets/confetti.json")} autoPlay loop />
    </View>
  );
};

export default Loader;
