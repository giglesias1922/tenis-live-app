import { View, TextInput, Text, TextInputProps } from "react-native";
import { formStyles } from "../styles/formStyles";

type Props = TextInputProps & {
  error?: string;
};

export default function CustomInput({ error, ...props }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      <TextInput
        {...props}
        style={[
          formStyles.field,
          error && { borderColor: "red", borderWidth: 1 }
        ]}
        placeholderTextColor={formStyles.placeholder.color}
      />

      {error && (
        <Text style={{ color: "red", marginLeft:3, marginTop: 4, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
