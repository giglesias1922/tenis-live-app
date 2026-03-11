import { Modal, Portal, Text, Button, useTheme, TextInput } from 'react-native-paper';
import React,{useState} from 'react'
import {View, StyleSheet} from "react-native"
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomPicker from "../../components/CustomPicker"
import {Club} from "../../models/Club"

type Props ={
    visible:boolean,
    onConfirm: () => void,
    onDismiss: () => void,
    clubData:Club[]
}

export default function SummaryFilter({visible, onDismiss, clubData}:Props) {
  const [date, setDate] = useState<Date | undefined>();
  const theme = useTheme();
  const [selectedClub, setSelectedClub] = useState<number | string | null>();
  const [rival, setRival] = useState<string | undefined>();

  const styles = StyleSheet.create({
    container: {
      padding: 28,
      margin: 20,
      borderRadius: 28,
    }
  });

  return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          contentContainerStyle={[
            styles.container,
            { backgroundColor: theme.colors.surfaceVariant }
          ]}
        >
          <Text variant="titleMedium" style={{textAlign:"center"}}>Estadísticas - Filtro</Text>
          <View style={{ padding: 20 }}>
            <CustomDatePicker
                label="Fecha Desde"
                value={date}
                onChange={setDate}
            />
          </View>          
          <View style={{ padding: 20 }}>
          <CustomPicker
              items={clubData.map(c => ({
                id: c.id,
                label: `${c.name} - ${c.city}`
              }))}
              value={selectedClub}
              onChange={setSelectedClub}
              label="Club"
            />

            <TextInput value={rival} onChangeText={setRival}>Rival</TextInput>

              
            <View style={{ flexDirection: "row", justifyContent:"space-between", marginTop: 20 }}>        
          <Button mode="text"
          onPress={()=>console.log("limpiar filtrar")}
          >Limpiar Filtros</Button>

          <Button mode="contained"
          onPress={()=>console.log("filtrar")}
          >Filtrar</Button>
        </View>
            </View>
        </Modal>
      </Portal>
  )
}