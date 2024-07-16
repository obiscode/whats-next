import { Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const FormInput = ({
  value,
  handleChangeText,
}: {
  value: string;
  handleChangeText: (Text: string) => void;
}) => {
  const [height, setHeight] = useState(50);
  return (
    <View className="w-full border-2 rounded-2xl py-2 focus:border-purple-900">
      <TextInput
        value={value}
        style={{ height: Math.max(50, height), paddingTop: 8 }}
        className="flex-col w-full h-full text-xl px-4"
        placeholder="Enter activity list with line breaks"
        multiline={true}
        onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

export default FormInput;
