import { StyleSheet, View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { IProduct, ITagsProductsMultiSelect } from "../../Model/IProduct";

type SelectProps = {
  items: { name: string; id: string; }[] | ITagsProductsMultiSelect[];
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  onFocus?: () => void;
  background: string;
  dropdownIconColor: string;
  textColor: string;
};

const Select = ({
  items,
  selectedValue,
  onValueChange,
  onFocus,
  background,
  dropdownIconColor,
  textColor,
}: SelectProps) => {
  return (
    <View style={styles.container}>
      <Picker
        style={[styles.select, { backgroundColor: background, color: textColor }]}
        onFocus={() => onFocus && onFocus()}
        selectedValue={selectedValue}
        onValueChange={(itemValue, index) =>
          onValueChange(itemValue as string, index)
        }
        dropdownIconColor={dropdownIconColor}
      >
        {items.map((item, index) => (
          <Picker.Item
            style={{
              backgroundColor: background,
              color: textColor,
              fontSize: 16,
            }}
            key={`Picker.Item.${item.id}.index`}
            label={item.name}
            value={item.id}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  select: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
  },
});

export default Select;