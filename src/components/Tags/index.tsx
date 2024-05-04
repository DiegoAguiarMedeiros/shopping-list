import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  TouchableHighlight,
  useColorScheme,
  SafeAreaView,
  ScrollView,
} from "react-native";

import * as Styled from "./styles";
import { Title } from "../Text";
import { TagsIterface } from "../../types/types";
import { useShoppingListContext } from "../../context/ShoppingList";
type TagsProps = {
  tags: TagsIterface[];
  isVisible: boolean;
  addTag: (tag: string) => void;
};

const Tags = ({ tags, isVisible, addTag }: TagsProps) => {
  const colorScheme = useColorScheme();
  const [tagsIsVisible, setTagsIsVisible] = useState(isVisible);

  const { getTheme, getColor } = useShoppingListContext();
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
      background={getColor().backgroundPrimary}
    >
      <Styled.TagsInner>
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="handled">
            {tags?.map((tag) => (
              <Styled.TagsItem
                onPress={() => handleAddTag(tag?.name)}
                key={`tagContainer-${tag.id}`}
                background={getColor().backgroundPrimary}
              >
                <Title
                  key={`tagTitle-${tag.id}`}
                  color={
                    colorScheme !== "dark" ? getColor().black : getColor().white
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
