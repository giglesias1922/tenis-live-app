  import * as React from "react";
  import { TextInput } from "react-native-paper";
  import { DatePickerModal, DatePickerModalSingleProps } from "react-native-paper-dates";
  
  type Props = {
    label: string
    value?: Date
    onChange: (date: Date | undefined) => void
  }
  
  export default function CustomDatePicker({ label, value, onChange }: Props) {
  
    const [open, setOpen] = React.useState(false);
  
    const onDismiss = () => setOpen(false);
  
    const onConfirm: DatePickerModalSingleProps["onConfirm"] = ({ date }) => {
      setOpen(false);
      onChange(date);
    };
  
    const formatDate = (date?: Date) => {
      if (!date) return "";
      return date.toLocaleDateString("es-AR");
    };
  
    return (
      <>
        <TextInput
          label={label}
          value={formatDate(value)}
          editable={false}
          right={
            <TextInput.Icon
              icon="calendar"
              onPress={() => setOpen(true)}
            />
          }
          onPressIn={() => setOpen(true)}
        />
  
        <DatePickerModal
          locale="es"
          mode="single"
          visible={open}
          onDismiss={onDismiss}
          date={value}
          onConfirm={onConfirm}
        />
      </>
    );
  }