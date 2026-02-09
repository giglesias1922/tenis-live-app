// components/CustomButton.tsx
import { Pressable, Text, StyleProp, ViewStyle } from 'react-native';

type ButtonSize = 'small' | 'medium' | 'large';

type Props = {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  size = 'medium',
  style,
  disabled = false,
}: Props) {
  const sizes = {
    small: { paddingVertical: 8, paddingHorizontal: 14 },
    medium: { paddingVertical: 12, paddingHorizontal: 18 },
    large: { paddingVertical: 16, paddingHorizontal: 22 },
  };

  const fontSize =
    size === 'small' ? 14 : size === 'large' ? 18 : 16;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#005FCC' : '#007AFF',
          borderRadius: 10,

          // 🔥 centra el texto
          alignItems: 'center',
          justifyContent: 'center',

          // feedback visual
          opacity: pressed ? 0.85 : 1,
        },
        sizes[size],
        style,
      ]}
    >
      <Text
        style={{
          color: '#fff',
          fontSize,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
