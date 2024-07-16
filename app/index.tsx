import React, { useState } from "react";
import { Text, View, Image, ScrollView, Dimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import images from "@/constants/images";
import FormInput from "@/components/FormInput.";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import useStore from "@/hooks/useStore";

const Welcome = () => {
  const { width } = Dimensions.get("window");
  const [inputValue, setInputValue] = useState("");
  const { addToList, currentList, clearAll } = useStore();

  const handleSave = () => {
    if (inputValue.length > 4) {
      clearAll();
      addToList(inputValue);
      setInputValue("");
      router.push("/shuffle");
    }
  };

  const handleReplace = () => {
    if (currentList.length > 0) {
      setInputValue(currentList.join("\n"));
    }
  };

  return (
    <SafeAreaView
      style={{
        marginHorizontal: width > 600 ? "auto" : 16,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View style={{ gap: 20 }} className="w-full flex items-center pt-16">
          <Text className="text-4xl font-extrabold text-center">
            What's next?
          </Text>
          <Image source={images.shout} resizeMode="contain" />
          <FormInput value={inputValue} handleChangeText={setInputValue} />
          <CustomButton
            title="Save List"
            handlePress={handleSave}
            isLoading={false}
            textStyles="text-white"
            containerStyles="w-full"
          />
          <CustomButton
            title="Replace with current List"
            handlePress={handleReplace}
            isLoading={false}
            textStyles=""
            containerStyles="w-full bg-white border-t-2 border-r-2"
          />
        </View>
      </ScrollView>

      <StatusBar />
    </SafeAreaView>
  );
};

export default Welcome;
