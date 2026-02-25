import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import {
  TextInput,
  Modal,
  Portal,
  Surface,
  Text,
  RadioButton,
  useTheme,
  Divider,
} from "react-native-paper";

type Item = {
  id: number | string;
  label: string;
};

type CustomPickerProps = {
  items: Item[];
  value?: number | string | null;
  onChange: (value: number | string | null) => void;
  placeholder?: string;
  error?: string | null;
  label?: string;
};

export default function CustomPicker({
  items,
  value,
  onChange,
  error,
  label,
  placeholder = "Seleccionar",
}: CustomPickerProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const selectedItem = items.find(
    (i) => i.id.toString() === value?.toString()
  );

  const handleSelect = (selected: string) => {
    const parsed =
      typeof items[0]?.id === "number"
        ? Number(selected)
        : selected;

    onChange(parsed);
    setVisible(false);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        label={label}
        mode="outlined"
        value={selectedItem ? selectedItem.label : ""}
        placeholder={placeholder}
        editable={false}
        onPressIn={() => setVisible(true)}
        right={<TextInput.Icon icon="chevron-down" />}
        error={!!error}
      />

      {error && (
        <Text
          style={{
            color: theme.colors.error,
            marginTop: 4,
            marginLeft: 4,
          }}
        >
          {error}
        </Text>
      )}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            margin: 20,
          }}
          style={{
            backgroundColor: theme.colors.backdrop,
          }}
        >
          <Surface
            style={{
              paddingVertical: 16,
              borderRadius: 16,
              backgroundColor: theme.colors.elevation.level3,
              elevation: 4,
            }}
          >
            <Text
              variant="titleMedium"
              style={{ paddingHorizontal: 20, marginBottom: 12 }}
            >
              Seleccionar
            </Text>

            <Divider />

            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <RadioButton.Item
                  label={item.label}
                  value={item.id.toString()}
                  status={
                    item.id.toString() === value?.toString()
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    handleSelect(item.id.toString())
                  }
                />
              )}
              style={{ maxHeight: 350 }}
            />
          </Surface>
        </Modal>
      </Portal>
    </View>
  );
}