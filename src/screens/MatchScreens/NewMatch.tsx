// screens/NewMatch.tsx
import {Button, Surface,TextInput,useTheme,Switch, Text,Menu} from "react-native-paper"
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomPicker from "../../components/CustomPicker";
import * as clubService from "../../services/clubService";
import * as matchService from "../../services/matchService";
import { RootStackParamList } from "../../navigation/AppNavigator";
import axios from "axios";
import {View,ScrollView} from "react-native";

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
  notes: string;
  supertiebreak: boolean;
};

export default function NewMatchScreen({ navigation }: Props) {
  const theme = useTheme();
  const [clubData, setClubData] = useState<Club[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      clubId: undefined,
      opponentName: "",
      round: "",
      notes: "",
      supertiebreak: false
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const response = await clubService.getClubes();
      setClubData(response.data);
    };

    loadData();
  }, []);

  function mapFormToStartMatch(data: FormData) : matchService.StartMatchObject
  {
    return{
      clubId : data.clubId,
      opponentName: data.opponentName,
      round: data.round,
      notes: data.notes,
      supertiebreak: data.supertiebreak,
    }
  }

  const onSubmit = async (data: FormData) => {
    try{
      setIsLoading(true)
      setServerError(null);

      await matchService.startMatch(mapFormToStartMatch(data));

      navigation.navigate("Home");
    }
    catch(error)
    {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Error del servidor";    

        setServerError(message);
      } else {
        setServerError("Error inesperado");
      }
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <Surface style={{ flex: 1, padding: 16 }}>
        <Text variant="headlineSmall" style={{textAlign:"center", marginBottom:16}}>Nuevo Partido</Text>

        {/* CLUB */}
        <View style={{ marginBottom: 16 }}>
        <Controller
          control={control}
          name="clubId"
          rules={{ required: "El club es obligatorio" }}
          render={({ field: { onChange, value } }) => (
            <CustomPicker
              items={clubData.map(c => ({
                id: c.id,
                label: `${c.name} - ${c.city}`
              }))}
              value={value}
              onChange={onChange}
              label="Club"
              error={errors.clubId?.message}
            />
          )}
        />
        </View>

        {/* OPONENTE */}
        <View style={{ marginBottom: 16 }}>
        <Controller
          control={control}
          name="opponentName"
          rules={{ required: "El rival es obligatorio" }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput label="Rival" mode="outlined" onChangeText={onChange} value={value} error={!!errors.opponentName}></TextInput>
              {errors.opponentName && ( <Text style={{color: theme.colors.error }}>{errors.opponentName.message}</Text> )}
            </>
          )}        
        />
        </View>

        {/* RONDA */}
        <View style={{ marginBottom: 16 }}>
        <Controller
            control={control}
            name="round"
            rules={{ required: "La ronda es obligatoria" }}
            render={({ field: { onChange, value } }) => (
                <>
                  <TextInput label="Ronda" mode="outlined" onChangeText={onChange} value={value} error={!!errors.round}></TextInput>
                  {errors.round && ( <Text style={{color: theme.colors.error }}>{errors.round.message}</Text> )}
                </>
              )}
        />
        </View>

      {/* SUPERTIEBREAK */}
      <View style={{ marginBottom: 16 }}>
        <Controller
          control={control}
          name="supertiebreak"
          render={({ field: { onChange, value } }) => (
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10
            }}>
              <Text variant="bodyMedium">SuperTiebreak</Text>
            <Switch onValueChange={onChange}  value={value}></Switch>
            </View>
          )}
        />
      </View>

        {/* NOTAS */}
        <View style={{ marginBottom: 16 }}>
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput label="Notas" mode="outlined" onChangeText={onChange} value={value}  multiline={true} numberOfLines={4} style={{height:150}}></TextInput>
            </>          
          )}        
        />
        </View>

        <View style={{ flexDirection: "row", justifyContent:"space-between", marginTop: 20 }}>        
          <Button mode="text"
          onPress={() => navigation.navigate("Home")}
          disabled={isLoading}
          >Cancelar</Button>

          <Button mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
          >Crear</Button>
        </View>

        <Text>{serverError}</Text>
      </Surface>
    </ScrollView>
  );
}
