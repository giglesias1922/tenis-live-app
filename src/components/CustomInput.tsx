import { TextInput, TextInputProps } from 'react-native';
import { formStyles } from '../styles/formStyles';

export default function CustomInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={[formStyles.field, props.style]}
      placeholderTextColor={formStyles.placeholder.color}
    />
  );
}
