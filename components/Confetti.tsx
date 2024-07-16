// Confetti.tsx
import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Canvas } from "@shopify/react-native-skia";
import ConfettiPiece from "@/utils/confettiPiesce";

const colors = ["#deb7ff", "#c785ec", "#a86add", "#8549a7", "#634087"];
const NUM_OF_CONFETTI = 70;
const { height, width } = Dimensions.get("window");

interface Offset {
  offsetId: string;
  startingXOffset: number;
  startingYOffset: number;
  colorCode: number;
}

const Confetti = () => {
  const [confettiPieces, setConfettiPieces] = useState<Offset[]>([]);

  useEffect(() => {
    const pieces: Offset[] = [];

    for (let i = 0; i < NUM_OF_CONFETTI; i++) {
      const startingXOffset = Math.random() * width;
      const startingYOffset = -Math.random() * (height * 3);
      const id = i + Math.random() + "";
      pieces.push({
        offsetId: id,
        startingXOffset,
        startingYOffset,
        colorCode: i % colors.length,
      });
    }

    setConfettiPieces(pieces);
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        {confettiPieces.map((offset) => (
          <ConfettiPiece key={offset.offsetId} {...offset} />
        ))}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Confetti;
