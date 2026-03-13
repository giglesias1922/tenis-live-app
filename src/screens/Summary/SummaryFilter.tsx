import { Modal, Portal, Text, Button, useTheme, TextInput } from 'react-native-paper';
import React,{useState} from 'react'
import {View, StyleSheet} from "react-native"
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomPicker from "../../components/CustomPicker"
import {Club} from "../../models/Club"
import {ClosedMatchFilter} from "../../models/ClosedMatchFilter"

type Props ={
    visible:boolean,
    onDismiss: () => void,
    clubData:Club[],
    setFilterData:(filter:ClosedMatchFilter) => void,
}

export default function SummaryFilter({visible, onDismiss, clubData, setFilterData}:Props) {
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

  function setFilter () 
  {
    const filter: ClosedMatchFilter = 
    {
      clubId: selectedClub ? Number(selectedClub) : undefined,
      fromDate: date,
      opponent: rival
    }

    setFilterData(filter);

    onDismiss();

  }

  function clearFilter () 
  {
    const filter: ClosedMatchFilter = 
    {
      clubId: undefined,
      fromDate: undefined,
      opponent: undefined
    }

    setFilterData(filter);

    onDismiss();
  }

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
          onPress={clearFilter}
          >Limpiar Filtros</Button>

          <Button mode="contained"
          onPress={setFilter}
          >Filtrar</Button>
        </View>
            </View>
        </Modal>
      </Portal>
  )
}