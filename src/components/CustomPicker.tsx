// components/CustomPicker.tsx
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { formStyles } from '../styles/formStyles';

type Item = {
  id: number | string;
  label: string;
};

type CustomPickerProps = {
  items: Item[];
  value: number | string | null;
  onChange: (value: number | string | null) => void;
  placeholder?: string;
};

export default function CustomPicker({
  items,
  value,
  onChange,
  placeholder = 'Seleccionar...'
}: CustomPickerProps) {
  const [visible, setVisible] = useState(false);
  const selectedItem = items.find(i => i.id === value);
  
  return (
    <>
      {/* Campo touchable */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={formStyles.field}
      >
        <Text style={{ color: selectedItem ? '#000' : '#999' }}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal iOS */}
      <Modal visible={visible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff' }}>
            {/* Barra superior */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 12,
                borderBottomWidth: 1,
                borderColor: '#eee',
              }}
            >
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={{ color: '#007AFF' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={{ color: '#007AFF', fontWeight: '600' }}>
                  Aceptar
                </Text>
              </TouchableOpacity>
            </View>

            
            {/* Picker */}
            <Picker
              selectedValue={value}
              onValueChange={v => onChange(v)}
            >              
            
              {items.map(i => (                
                <Picker.Item key={i.id} label={i.label} value={i.id} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
}