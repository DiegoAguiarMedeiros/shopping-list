import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Colors from "../../constants/Colors";
import * as Styled from "./styles";
import { Title } from "../Text";
import { TagsIterface } from "../../types/types";
type TagsProps = {
  tags: TagsIterface[];
  isVisible: boolean;
  addTag: (tag: string) => void;
};

const Tags = ({ tags, isVisible, addTag }: TagsProps) => {
  const colorScheme = useColorScheme();
  const [tagsIsVisible, setTagsIsVisible] = useState(isVisible);

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

  useEffect(() => {
    setTagsIsVisible(isVisible);
  }, [isVisible]);

  const handleAddTag = (tag: string): void => {
    addTag(tag);
    setTagsIsVisible(false);
  };

  return (
    <Styled.Tags
      isVisible={tagsIsVisible}
      marginTop={returnMarginTop(tags.length)}
      background={Colors[colorScheme ?? "light"].tagSelectBackgroundColor}
    >
      <Styled.TagsInner>
        <SafeAreaView>
          <ScrollView>
            {tags?.map((tag) => (
              <Styled.TagsItem
                onPress={() => handleAddTag(tag?.name)}
                key={`tagContainer-${tag.id}`}
                background={
                  Colors[colorScheme ?? "light"].tagSelectInputBackgroundColor
                }
              >
                <Title
                  key={`tagTitle-${tag.id}`}
                  color={
                    colorScheme !== "dark"
                      ? Colors[colorScheme ?? "light"].black
                      : Colors[colorScheme ?? "light"].white
                  }
                >
                  {tag?.name}
                </Title>
              </Styled.TagsItem>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Styled.TagsInner>
    </Styled.Tags>
  );
};

export default Tags;
