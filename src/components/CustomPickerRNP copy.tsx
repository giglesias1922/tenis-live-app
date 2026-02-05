// components/PaperCustomPicker.tsx
import { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu } from 'react-native-paper';

type Item = {
  id: number | string;
  label: string;
};

type PaperCustomPickerProps = {
  items: Item[];
  value: number | string | null;
  onChange: (value: number | string) => void;
  placeholder?: string;
};

export default function PaperCustomPicker({
  items,
  value,
  onChange,
  placeholder = 'Seleccionar...',
}: PaperCustomPickerProps) {
  const [visible, setVisible] = useState(false);

  const selectedItem = items.find(i => i.id === value);

  return (
    <View style={{ marginVertical: 8 }}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TextInput
            label={placeholder}
            value={selectedItem?.label ?? ''}
            mode="outlined"
            editable={false}
            right={<TextInput.Icon icon="menu-down" />}
            onPressIn={() => setVisible(true)}
          />
        }
      >
        {items.map(i => (
          <Menu.Item
            key={i.id}
            title={i.label}
            onPress={() => {
              onChange(i.id);
              setVisible(false);
            }}
          />
        ))}
      </Menu>
    </View>
  );
}
