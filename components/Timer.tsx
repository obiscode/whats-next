import { useTimerStore } from "@/hooks/useTimerStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Text, View, Pressable } from "react-native";

const Timer = ({
  activity,
  onEnd,
}: {
  activity: string;
  onEnd: (duration: string) => void;
}) => {
  const {
    duration,
    isFocused,
    isPaused,
    setDuration,
    startFocus,
    endFocus,
    togglePause,
  } = useTimerStore();

  const handleStop = () => {
    onEnd(`${formattedTimeMinutes}:${formattedTimeSeconds}`);
    endFocus();
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (!isPaused && isFocused) {
      timerId = setTimeout(() => {
        setDuration(duration + 1);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [duration, isFocused, isPaused, setDuration]);

  const formattedTimeMinutes = String(Math.floor(duration / 60)).padStart(
    2,
    "0"
  );
  const formattedTimeSeconds = String(duration % 60).padStart(2, "0");

  return (
    <View className="bg-white w-full rounded-xl min-h-[64px] flex flex-row justify-between items-center border-l-8 border-b-8 px-4 border-t-2 border-r-2">
      <Text className="text-lg font-bold">
        {activity?.length! < 13 ? activity : activity?.slice(0, 13) + "..."}
      </Text>
      <View className="flex flex-row justify-center items-center">
        <Text className="text-xl font-bold pr-2">
          {formattedTimeMinutes}:{formattedTimeSeconds}
        </Text>
        {isFocused && (
          <>
            <Pressable onPress={togglePause}>
              {isPaused ? (
                <Ionicons name="play-circle" size={40} color="#61E4C5" />
              ) : (
                <Ionicons name="pause-circle" size={40} color="#FABF16" />
              )}
            </Pressable>

            <Pressable onPress={handleStop}>
              <Ionicons name="stop-circle" size={40} color="red" />
            </Pressable>
          </>
        )}
        {!isFocused && (
          <Pressable onPress={startFocus}>
            <Ionicons name="play-circle" size={40} color="#61E4C5" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Timer;
