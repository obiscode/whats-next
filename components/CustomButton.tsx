import { ActivityIndicator, Text, Pressable } from "react-native";

type props = {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: props) => {
  return (
    <Pressable
      onPress={handlePress}
      style={{ borderBottomLeftRadius: 8 }}
      className={`bg-blue-700 rounded-xl min-h-[64px] flex flex-row justify-center items-center border-l-8 border-b-8 ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-bold text-xl ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          //   color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </Pressable>
  );
};

export default CustomButton;
