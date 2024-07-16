import { Image, View, Text } from "react-native";
import React from "react";
import images from "@/constants/images";

const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-base font-pmedium ">{title}</Text>
      <Text className="text-2xl text-center font-psemibold mt-2">
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyState;
