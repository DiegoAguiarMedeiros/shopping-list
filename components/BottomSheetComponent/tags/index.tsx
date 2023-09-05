import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Colors from "../../../constants/Colors";
import * as Styled from "./styles";
import { Title } from "../../Text";
import { TagsIterface } from "../../../types/types";
type TagsProps = {
  tags: TagsIterface[];
  isVisible: boolean;
};

const Tags = ({ tags, isVisible }: TagsProps) => {
  const colorScheme = useColorScheme();

  const returnMarginTop = (tags: number): string => {
    switch (tags) {
      case 0:
        return "0";
      case 1:
        return "20";
      case 2:
        return "-35";
      case 3:
        return "-90";
      default:
        return "-90";
    }
  };

  return (
    <Styled.Tags
      isVisible={isVisible}
      marginTop={returnMarginTop(tags.length)}
      background={Colors[colorScheme ?? "light"].bottomSheetBackgroundColor}
    >
      {tags?.map((tag) => (
        <Styled.TagsItem
          key={`tagContainer-${tag.id}`}
          background={Colors[colorScheme ?? "light"].inputBackgroundColor}
        >
          <Title
            key={`tagTitle-${tag.id}`}
            color={
              colorScheme !== "dark"
                ? Colors[colorScheme ?? "light"].black
                : Colors[colorScheme ?? "light"].white
            }
          >
            {tag.name}
          </Title>
        </Styled.TagsItem>
      ))}
    </Styled.Tags>
  );
};

export default Tags;
