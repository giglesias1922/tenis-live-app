// screens/NewMatch.tsx
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomPicker from "../../components/CustomPicker";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import * as clubService from "../../services/clubService";
import * as matchService from "../../services/matchService";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "NewMatch">;

type Club = {
  id: number;
  name: string;
  city: string;
};

type FormData = {
  clubId: number;
  opponentName: string;
  round: string;
  note: string;
};

export default function NewMatchScreen({ navigation }: Props) {
  const [clubData, setClubData] = useState<Club[]>([]);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      clubId: undefined,
      opponentName: "",
      round: "",
      note: "",
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const response = await clubService.getClubes();
      setClubData(response.data);
    };

    loadData();
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log("entre");
    await matchService.startMatch(data);
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      
      {/* CLUB */}
      <Controller
        control={control}
        name="clubId"
        rules={{ required: "El club es obligatorio" }}
        render={({ field: { onChange, value } }) => (
          <CustomPicker
            items={clubData.map(c => ({
              id: c.id,
              label: `${c.name} - ${c.city}`,
            }))}
            value={value}
            onChange={v => onChange(Number(v))}
            placeholder="Seleccionar club"
            error= {errors.clubId?.message}
          />
        )}
      />

      {/* OPONENTE */}
      <Controller
        control={control}
        name="opponentName"
        rules={{ required: "El oponente es obligatorio" }}
        render={({ field: { onChange, value } }) => (
          <CustomInput
            placeholder="Oponente"
            value={value}
            onChangeText={onChange}
            error={errors.opponentName?.message}
          />
        )}
      />

      {/* RONDA */}
      <Controller
  control={control}
  name="round"
  rules={{ required: "La ronda es obligatoria" }}
  render={({ field: { onChange, value } }) => (
      <CustomInput
        placeholder="Ronda"
        value={value}
        onChangeText={onChange}
        error={errors.round?.message}
      />
  )}
/>

      

      {/* NOTAS */}
      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, value } }) => (
          <CustomInput
            placeholder="Notas"
            multiline
            numberOfLines={4}
            style={{ minHeight: 150 }}
            value={value}
            onChangeText={onChange}
          />
        )}        
      />

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
        <CustomButton
          title="Guardar"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={{ marginRight: 40 }}
        />

        <CustomButton
          title="Cancelar"
          onPress={() => navigation.navigate("Home")}
          style={{ backgroundColor: "gray" }}
        />
      </View>
    </View>
  );
}
