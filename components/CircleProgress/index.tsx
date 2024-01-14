import React from "react";
import { TextInputProps, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";
import CircularProgress from "react-native-circular-progress-indicator";
import Container from "../Container";

type CircleProgressProps = {
  progress: number;
  filled: number;
  total: number;
  size: number;
  activeStrokeColor: string;
  circleBackgroundColor: string;
  titleColor: string;
};

const CircleProgress = ({
  filled,
  total,
  progress,
  size,
  circleBackgroundColor,
  activeStrokeColor,
  titleColor,
}: CircleProgressProps) => {
  const getTitleFontSize = (): number => {
    if (total < 10) return 12;
    if (total < 100) return 9;
    return 7;
  };
  return (
    <CircularProgress
      titleStyle={{ fontWeight: "800" }}
      showProgressValue={false}
      titleFontSize={getTitleFontSize()}
      activeStrokeWidth={5}
      title={`${progress}/${total}`}
      value={progress > 0 ? (progress / total) * 100 : progress}
      radius={size}
      duration={2000}
      circleBackgroundColor={circleBackgroundColor}
      activeStrokeColor={activeStrokeColor}
      maxValue={100}
      titleColor={titleColor}
    />
  );
};
export default CircleProgress;
