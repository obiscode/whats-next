import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import images from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Activity from "@/components/Activity";
import EmptyState from "@/components/EmptyState";
import useStore from "@/hooks/useStore";
import Modal from "@/components/Modal";
import { shuffleArray } from "@/utils/shuffleArray";
import Loader from "@/components/Loader";
import * as Haptics from "expo-haptics";
import { useTimerStore } from "@/hooks/useTimerStore";

const Shuffle = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const { currentList, removeFromList } = useStore();
  const [shuffledList, setShuffledList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { startFocus } = useTimerStore();

  const handleShuffle = async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setLoading(true);
    setTimeout(() => {
      const sArray = shuffleArray([...currentList]);
      setShuffledList(sArray);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    setShuffledList(currentList);
  }, [currentList]);

  const handleStart = (item: string) => {
    removeFromList(item);
    router.push(`/focus?activity=${item}`);
    startFocus();
  };

  const confirmDelete = (item: string) => {
    setModalItem(item);
    setModalOpen(true);
  };

  const handleDelete = () => {
    removeFromList(modalItem);
    setModalOpen(false);
  };

  return (
    <SafeAreaView style={{ marginHorizontal: "auto" }}>
      {loading ? (
        <View className="">
          <Loader isLoading={loading} />
        </View>
      ) : (
        <FlatList
          data={shuffledList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className="">
              <Activity
                item={item}
                index={index}
                isSingleItem={shuffledList.length === 1}
                handleStart={handleStart}
                handleDelete={confirmDelete}
              />
            </View>
          )}
          ListHeaderComponent={() => (
            <View
              style={{ gap: 20 }}
              className="flex items-center my-6 px-4 space-y-6"
            >
              <Text className="text-4xl font-extrabold text-center">
                What's next?
              </Text>

              <Image source={images.shout} resizeMode="contain" />
              <CustomButton
                title="Shuffle"
                handlePress={handleShuffle}
                isLoading={loading}
                textStyles="text-white"
                containerStyles="w-full"
              />
              <CustomButton
                title="Add New List"
                handlePress={() => router.push("/")}
                containerStyles="w-full px-4 bg-white border-t-2 border-r-2"
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title="List is empty" subtitle="No list created yet" />
          )}
        />
      )}
      <Modal isOpen={modalOpen}>
        <CustomButton
          title="Delete Item"
          handlePress={handleDelete}
          textStyles="text-white"
          containerStyles="w-full  px-4 bg-red-500 border-t-2 border-r-2 mb-2"
        />
        <CustomButton
          title="Cancel"
          handlePress={() => setModalOpen(false)}
          containerStyles="w-full px-4 bg-white border-t-2 border-r-2"
        />
      </Modal>
      <StatusBar />
    </SafeAreaView>
  );
};

export default Shuffle;
