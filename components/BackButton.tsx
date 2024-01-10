import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // You can choose your preferred icon library

const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
      <Icon name="chevron-back" size={24} color="black" />
      {/* Use "arrow-back" if you prefer a different icon */}
    </TouchableOpacity>
  );
};

export default BackButton;
