import { Surface, Text,Card } from 'react-native-paper'
import React,{useState,useEffect} from 'react'
import * as matchService from "../../services/matchService"
import {FlatList} from "react-native"
import SummaryCard from "./SummaryCard"
import { useNavigation } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SummaryList"
>;

export default function SummaryHeaderScreen() {
    const [data, setData] = useState<matchService.MatchClosed[]>([])
    const navigation = useNavigation<NavigationProp>();
    
    

    useEffect(() => {
        const loadData = async()=>{
            const response  = await matchService.getClosed();

            setData(response);
        } 

        loadData();
    }, [])
        
    function onPress(selectedMatchId: number) {
        navigation.navigate("SummaryDetail", {matchId: selectedMatchId});
      }

    return (
        <Surface style={{flex:1, alignItems:"center"}}>

        <Text variant="titleLarge" style={{marginTop:10}}>Estadísticas</Text>

        <FlatList
            data={data}
            keyExtractor={(item) => item.matchId.toString()}
            renderItem={({ item }) => (
            <SummaryCard match={item} onPress={onPress}/>
            )}
        />
        </Surface>
    )
}