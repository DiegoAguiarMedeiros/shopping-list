import React from "react";
import { TextInputProps, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";
import CircularProgress from "react-native-circular-progress-indicator";

type CircleProgressProps = {
  progress: number;
  filled: number;
  total: number;
  size: number;
};

const CircleProgress = ({
  filled,
  total,
  progress,
  size,
}: CircleProgressProps) => {
  const colorScheme = useColorScheme();

  return (
    <CircularProgress
      showProgressValue={false}
      titleFontSize={12}
      activeStrokeWidth={5}
      title={`${progress}/${total}`}
      value={progress > 0 ? (progress / total) * 100 : progress}
      radius={size}
      duration={2000}
      circleBackgroundColor={
        Colors[colorScheme ?? "light"].circleProgresBackgroundUnfilledColor
      }
      activeStrokeColor={
        Colors[colorScheme ?? "light"].circleProgresBackgroundFilledColor
      }
      maxValue={100}
      titleColor={Colors[colorScheme ?? "light"].circleProgresTextColor}
    />
  );
};
export default CircleProgress;
