// screens/NewMatch.tsx
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import CustomPicker from '../../components/CustomPicker';
import * as clubService from '../../services/clubService';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "NewMatch"
>;

type Club = {
  id: number;
  name: string;
  city: string;
};

export default function NewMatchScreen({ navigation }: Props) {
  const [clubData, setClubData] =  useState<Club[]>([]);
  const [clubId, setClubId] = useState<number | null>(null); 
  const [courtId, setCourtId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
        try {
          const response = await clubService.getClubes();
          
          setClubData(response.data);

        } catch (error) {
          setError("No se pudieron cargar los datos");
        } finally {
          setLoading(false);
        }
      };
    
      loadData();
  }, [])
  
  function handleSave()
  {
    console.log("graba")
  }

  function handleCancel()
  {
    console.log("cancel")
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Selector de Club */}
      <CustomPicker
        items={clubData.map(c => ({
          id: c.id,
          label: c.name + " - " + c.city,
        }))}
        value={clubId}
        onChange={(v) => setClubId(Number(v))}
        placeholder="Seleccionar club"
      />

      <CustomInput placeholder="Oponente" />

      <CustomInput placeholder="Ronda" />

      <CustomInput placeholder="Notas" multiline numberOfLines={4} style={{
          minHeight: 150,
        }}/>

<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:20}}>
      <CustomButton
        title="Guardar"
        onPress={handleSave}
        style={{ marginRight: 40 }}
      />

      <CustomButton
        title="Cancelar"
        onPress={handleCancel}
        style={{ backgroundColor: 'gray' }}
      />
</View>
      
   </View>
  );
}