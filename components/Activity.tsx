import { View, Text, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Activity = ({
  item,
  index,
  isSingleItem,
  handleDelete,
  handleStart,
}: {
  item: string;
  index: number;
  isSingleItem: boolean;
  handleDelete: (item: string) => void;
  handleStart: (item: string) => void;
}) => {
  return (
    <View className="flex flex-row justify-between items-center px-4 py-2">
      <View className={`flex flex-row justify-start items-center gap-2`}>
        <View className="flex justify-center items-center bg-[#61E4C5] w-10 h-10 rounded-full border-2">
          <Text className="text-xl font-bold text-white">{index + 1}</Text>
        </View>
        <Text className="text-lg font-medium leading-6 w-2/3">{item}</Text>
      </View>
      {index === 0 ? (
        !isSingleItem ? (
          <Pressable onPress={() => handleStart(item)}>
            <Ionicons name="play-circle" size={40} color="#61E4C5" />
          </Pressable>
        ) : (
          <View className="flex flex-row">
            <Pressable onPress={() => handleStart(item)}>
              <Ionicons name="play-circle" size={40} color="#61E4C5" />
            </Pressable>

            <Pressable onPress={() => handleDelete(item)}>
              <Ionicons name="trash" size={32} color="#4e4e4e" />
            </Pressable>
          </View>
        )
      ) : (
        <Pressable onPress={() => handleDelete(item)}>
          <Ionicons name="trash" size={32} color="#4e4e4e" />
        </Pressable>
      )}
    </View>
  );
};

export default Activity;
