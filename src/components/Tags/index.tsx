import {  useEffect, useState } from "react";
import {
  StyleSheet,
  Animated,
  TouchableHighlight,
  useColorScheme,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../Text";
import { TagsIterface } from "../../types/types";
import { useStores } from "../../context/StoreContext";
type TagsProps = {
  tags: TagsIterface[];
  isVisible: boolean;
  addTag: (tag: string) => void;
};

const Tags = ({ tags, isVisible, addTag }: TagsProps) => {
  const { ConfigRepository } = useStores();
  const colorScheme = useColorScheme();
  const [tagsIsVisible, setTagsIsVisible] = useState(isVisible);

  const returnMarginTop = (tags: number): number => {
    switch (tags) {
      case 0:
        return 0;
      case 1:
        return 20;
      case 2:
        return -35;
      case 3:
        return -90;
      default:
        return -90;
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
    <View
      style={[styles.tags, {
        backgroundColor: ConfigRepository.color.backgroundPrimary,
        display: tagsIsVisible ? 'contents' : 'none',
        marginTop: returnMarginTop(tags.length)
      }]}
    >
      <View style={styles.tagsInner}>
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="handled">
            {tags?.map((tag) => (
              <TouchableHighlight
                style={[styles.tagsItem, {
                  backgroundColor: ConfigRepository.color.backgroundPrimary,
                }]}
                underlayColor={ConfigRepository.color.backgroundTertiary}
                onPress={() => handleAddTag(tag?.name)}
                key={`tagContainer-${tag.id}`}
              >
                <Title
                  key={`tagTitle-${tag.id}`}
                  color={
                    colorScheme !== "dark" ? ConfigRepository.color.black : ConfigRepository.color.white
                  }
                >
                  {tag?.name}
                </Title>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tags: {
    width: ' 92.8%',
    position: 'absolute',
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 20,
    height: 'auto',
    maxHeight: 183,
    overflow: 'scroll',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
  },
  tagsInner: {
    height: 'auto',
    maxHeight: 170,
  },
  tagsItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 45,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
});

export default Tags;
