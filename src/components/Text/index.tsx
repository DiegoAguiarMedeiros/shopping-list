import React from "react";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";

interface TextProps {
  children: React.ReactNode;
  color: string;
  align?: "auto" | "left" | "right" | "center" | "justify";
}


const Title: React.FC<TextProps> = ({ children, color, align }) => {
  return (
    <RNText style={[styles.title, { color, textAlign: align }]}>
      {children}
    </RNText>
  );
};

const Title2: React.FC<TextProps> = ({ children, color, align }) => {
  return (
    <RNText style={[styles.title2, { color, textAlign: align }]}>
      {children}
    </RNText>
  );
};

const SubTitle: React.FC<TextProps> = ({ children, color, align }) => {
  return (
    <RNText style={[styles.subTitle, { color, textAlign: align }]}>
      {children}
    </RNText>
  );
};

const Text: React.FC<TextProps> = ({ children, color, align }) => {
  return (
    <RNText style={[styles.text, { color, textAlign: align }]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    width: "100%",
    fontWeight: "800",
  },
  title2: {
    fontSize: 18,
    width: "100%",
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 16,
    width: "100%",
  },
  text: {
    fontSize: 14,
  },
});

export { Title, Title2, SubTitle, Text };