// components/CustomPicker.tsx
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { formStyles } from "../styles/formStyles";

type Item = {
  id: number | string;
  label: string;
};

type CustomPickerProps = {
  items: Item[];
  value: number | string | null;
  onChange: (value: number | string | null) => void;
  placeholder?: string;
  error?: string;
};

export default function CustomPicker({
  items,
  value,
  onChange,
  placeholder = "Seleccionar...",
  error,
}: CustomPickerProps) {
  const [visible, setVisible] = useState(false);
  const selectedItem = items.find(i => i.id === value);

  return (
    <View style={{ marginBottom: 12 }}>
      {/* Campo touchable */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[
          formStyles.field,
          error && { borderColor: "red", borderWidth: 1 },
        ]}
      >
        <Text style={{ color: selectedItem ? "#000" : "#999" }}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Error */}
      {error && (
        <Text style={{ color: "red", marginLeft:3,marginTop: 4, fontSize: 12 }}>
          {error}
        </Text>
      )}

      {/* Modal */}
      <Modal visible={visible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: "#fff" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 12,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={{ color: "#007AFF" }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={{ color: "#007AFF", fontWeight: "600" }}>
                  Aceptar
                </Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={value}
              onValueChange={v => onChange(v)}
            >
              {items.map(i => (
                <Picker.Item
                  key={i.id}
                  label={i.label}
                  value={i.id}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}
