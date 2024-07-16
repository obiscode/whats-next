import { View, Text } from "react-native";
import React from "react";
import { HistoryItem } from "@/hooks/useStore";
import { format, parseISO } from "date-fns";

const HistoryRecord = ({ item }: { item: HistoryItem }) => {
  const formattedDate = format(parseISO(item.date), "EEEE, MMM d");
  const formattedStartTime = format(parseISO(item.startTime), "hh:mm a");
  const formattedEndTime = format(parseISO(item.endTime), "hh:mm a");

  return (
    <View className="mb-6 gap-2">
      <View className="flex flex-row justify-between items-start px-4">
        <Text className="text-lg font-bold leading-6 w-2/3">{item.title}</Text>
        <Text className="text-lg font-bold leading-6">{item.duration}</Text>
      </View>
      <View className="flex flex-row justify-between items-center px-4">
        <Text className="text-xs">{formattedDate}</Text>
        <Text className="text-xs">{`${formattedStartTime} - ${formattedEndTime}`}</Text>
      </View>
    </View>
  );
};

export default HistoryRecord;
