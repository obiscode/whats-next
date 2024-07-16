import React, { useCallback, useState } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import useStore from "@/hooks/useStore";
import Timer from "@/components/Timer";
import HistoryRecord from "@/components/HistoryRecord";

const Focus = () => {
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const { historyList, addToHistory } = useStore();
  const { activity } = useLocalSearchParams();

  const onEnd = useCallback(
    (duration: string) => {
      const endTime = new Date().toISOString();
      addToHistory({
        duration: duration,
        title: activity as string,
        startTime: startTime,
        endTime: endTime,
        date: new Date().toISOString(),
      });
      router.push("/shuffle");
    },
    [activity]
  );

  return (
    <SafeAreaView style={{ marginHorizontal: "auto" }}>
      <FlatList
        data={historyList.reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mx-2">
            <HistoryRecord item={item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              gap: 20,
              alignItems: "center",
              marginVertical: 24,
              marginHorizontal: 24,
            }}
          >
            <Text
              style={{ fontSize: 32, fontWeight: "800", textAlign: "center" }}
            >
              Focus Mode
            </Text>
            <Image source={images.focus} resizeMode="contain" />
            <Timer activity={activity as string} onEnd={onEnd} />
          </View>
        )}
      />
      <StatusBar />
    </SafeAreaView>
  );
};

export default Focus;
