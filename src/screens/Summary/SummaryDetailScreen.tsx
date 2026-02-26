import React,{useState,useEffect} from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Surface,Text,Button, DataTable ,Divider  } from 'react-native-paper';
import * as matchEventService from "../../services/matchEventService"
import SummaryItem from './SummaryItem';

type Props = NativeStackScreenProps<
  RootStackParamList,
  "SummaryDetail"
>;


export default function SummaryDetailScreen({ route }: Props) {
  const { matchId } = route.params;
  const [data, setData] = useState<matchEventService.MatchSummary[]>([])

  useEffect(() => {
    const loadData = async () =>{
        const response = await matchEventService.GetSummary(matchId);
        setData(response);

        console.log(data);
    }
  
    loadData();

  }, [])
  

  return (    
    <Surface style={{flex:1}}>
      <Text variant="titleMedium" style={{marginTop:10}}>SummaryDetailScreen</Text>

      <Surface>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Event</DataTable.Title>
                <DataTable.Title numeric>Count</DataTable.Title>
            </DataTable.Header>
        
        <SummaryItem data={data}></SummaryItem>

        </DataTable>
      </Surface>
    </Surface>
  )
}