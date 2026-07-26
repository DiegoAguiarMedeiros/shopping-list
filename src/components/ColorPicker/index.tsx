import React, { useEffect, useMemo, useState } from "react";
import { GestureResponderEvent, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { Text } from "../Text";

const PICKER_SIZE = 260;

type Hsv = { h: number; s: number; v: number };

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  background: string;
  primary: string;
  buttonText: string;
  doneText: string;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const getContrastText = (hex: string) => {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return red * 299 + green * 587 + blue * 114 >= 150000 ? "#000" : "#FFF";
};

const hexToHsv = (hex: string): Hsv => {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16) / 255;
  const green = parseInt(value.slice(2, 4), 16) / 255;
  const blue = parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let hue = 0;

  if (delta) {
    if (max === red) hue = 60 * (((green - blue) / delta) % 6);
    if (max === green) hue = 60 * ((blue - red) / delta + 2);
    if (max === blue) hue = 60 * ((red - green) / delta + 4);
  }

  return { h: (hue + 360) % 360, s: max === 0 ? 0 : delta / max, v: max };
};

const hsvToHex = ({ h, s, v }: Hsv) => {
  const chroma = v * s;
  const component = chroma * (1 - Math.abs((h / 60) % 2 - 1));
  const match = v - chroma;
  const [red, green, blue] = h < 60 ? [chroma, component, 0]
    : h < 120 ? [component, chroma, 0]
      : h < 180 ? [0, chroma, component]
        : h < 240 ? [0, component, chroma]
          : h < 300 ? [component, 0, chroma]
            : [chroma, 0, component];
  const toHex = (channel: number) => Math.round((channel + match) * 255).toString(16).padStart(2, "0");
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase();
};

export default function ColorPicker({ value, onChange, background, primary, buttonText, doneText }: ColorPickerProps) {
  const [visible, setVisible] = useState(false);
  const [hsv, setHsv] = useState(() => hexToHsv(value));
  const selectedColor = useMemo(() => hsvToHex(hsv), [hsv]);

  useEffect(() => {
    if (!visible) setHsv(hexToHsv(value));
  }, [value, visible]);

  const setSaturationAndValue = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    setHsv((current) => ({ ...current, s: clamp(locationX / PICKER_SIZE), v: 1 - clamp(locationY / PICKER_SIZE) }));
  };

  const setHue = (event: GestureResponderEvent) => {
    // Read native-event data before the state updater runs: React Native may
    // release or invalidate the event object by then.
    const { locationX } = event.nativeEvent;
    setHsv((current) => ({ ...current, h: clamp(locationX / PICKER_SIZE) * 360 }));
  };

  return (
    <>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={buttonText}
        onPress={() => setVisible(true)}
        style={[styles.trigger, { backgroundColor: value }]}
      >
        <Text color={getContrastText(value)}>{buttonText}</Text>
      </TouchableOpacity>
      <Modal transparent animationType="fade" visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <View style={[styles.sheet, { backgroundColor: background }]}>
            <View
              style={styles.colorArea}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={setSaturationAndValue}
              onResponderMove={setSaturationAndValue}
            >
              <Svg width={PICKER_SIZE} height={PICKER_SIZE}>
                <Defs>
                  <LinearGradient id="saturation" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#FFF" stopOpacity="1" />
                    <Stop offset="1" stopColor="#FFF" stopOpacity="0" />
                  </LinearGradient>
                  <LinearGradient id="brightness" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#000" stopOpacity="0" />
                    <Stop offset="1" stopColor="#000" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect width={PICKER_SIZE} height={PICKER_SIZE} fill={`hsl(${hsv.h}, 100%, 50%)`} />
                <Rect width={PICKER_SIZE} height={PICKER_SIZE} fill="url(#saturation)" />
                <Rect width={PICKER_SIZE} height={PICKER_SIZE} fill="url(#brightness)" />
              </Svg>
              <View style={[styles.colorMarker, { left: hsv.s * PICKER_SIZE - 10, top: (1 - hsv.v) * PICKER_SIZE - 10 }]} />
            </View>
            <View
              style={styles.hueArea}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={setHue}
              onResponderMove={setHue}
            >
              <Svg width={PICKER_SIZE} height={28}>
                <Defs>
                  <LinearGradient id="hue" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#F00" /><Stop offset="0.17" stopColor="#FF0" />
                    <Stop offset="0.33" stopColor="#0F0" /><Stop offset="0.5" stopColor="#0FF" />
                    <Stop offset="0.67" stopColor="#00F" /><Stop offset="0.83" stopColor="#F0F" />
                    <Stop offset="1" stopColor="#F00" />
                  </LinearGradient>
                </Defs>
                <Rect width={PICKER_SIZE} height={28} rx={8} fill="url(#hue)" />
              </Svg>
              <View style={[styles.hueMarker, { left: hsv.h / 360 * PICKER_SIZE - 3 }]} />
            </View>
            <View style={styles.actions}>
              <View style={[styles.preview, { backgroundColor: selectedColor }]} />
              <TouchableOpacity onPress={() => { onChange(selectedColor); setVisible(false); }} style={[styles.doneButton, { backgroundColor: primary }]}>
                <Text color="#FFF">{doneText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: { width: "90%", height: 38, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000088" },
  sheet: { width: 300, borderRadius: 16, padding: 20, alignItems: "center" },
  colorArea: { width: PICKER_SIZE, height: PICKER_SIZE, borderRadius: 8, overflow: "hidden" },
  colorMarker: { position: "absolute", width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#FFF" },
  hueArea: { width: PICKER_SIZE, height: 28, marginTop: 16, borderRadius: 8, overflow: "hidden" },
  hueMarker: { position: "absolute", top: 0, width: 6, height: 28, borderRadius: 3, backgroundColor: "#FFF", borderWidth: 1, borderColor: "#000" },
  actions: { width: PICKER_SIZE, marginTop: 18, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  preview: { width: 42, height: 42, borderRadius: 8, borderWidth: 1, borderColor: "#00000022" },
  doneButton: { minWidth: 110, height: 42, justifyContent: "center", alignItems: "center", borderRadius: 8 },
});
