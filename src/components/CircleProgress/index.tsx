import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { ensureContrast, getContrastColor } from "../../../constants/Colors";

type CircleProgressProps = {
  progress: number;
  total: number;
  size: number;
  activeStrokeColor: string;
  circleBackgroundColor: string;
};

const CircleProgress = ({
  total,
  progress,
  size,
  circleBackgroundColor,
  activeStrokeColor,
}: CircleProgressProps) => {
  const safeProgress = Number.isFinite(progress) ? progress : 0;
  const safeTotal = Number.isFinite(total) && total > 0 ? total : 0;
  const safeSize = Number.isFinite(size) && size > 0 ? size : 22;
  const completion = safeTotal > 0 ? Math.min(Math.max(safeProgress / safeTotal, 0), 1) : 0;
  const strokeWidth = 5;
  const radius = safeSize - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const resolvedStrokeColor = ensureContrast(activeStrokeColor, circleBackgroundColor);
  const resolvedTitleColor = getContrastColor(circleBackgroundColor);

  const getTitleFontSize = (): number => {
    if (safeTotal < 10) return 12;
    if (safeTotal < 100) return 9;
    return 7;
  };
  return (
    <View
      style={[
        styles.circle,
        {
          width: safeSize * 2,
          height: safeSize * 2,
          borderRadius: safeSize,
          backgroundColor: circleBackgroundColor,
        },
      ]}
    >
      <Svg
        width={safeSize * 2}
        height={safeSize * 2}
        style={styles.progress}
        accessibilityElementsHidden
      >
        <Circle
          cx={safeSize}
          cy={safeSize}
          r={radius}
          fill="none"
          stroke={resolvedStrokeColor}
          strokeOpacity={0.25}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={safeSize}
          cy={safeSize}
          r={radius}
          fill="none"
          stroke={resolvedStrokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - completion)}
          transform={`rotate(-90 ${safeSize} ${safeSize})`}
        />
      </Svg>
      <Text
        numberOfLines={1}
        style={{ color: resolvedTitleColor, fontSize: getTitleFontSize(), fontWeight: "800" }}
      >
        {`${safeProgress}/${safeTotal}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progress: { position: "absolute" },
});

export default CircleProgress;
