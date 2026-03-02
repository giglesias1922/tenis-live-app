import { Surface, Text,ActivityIndicator ,Searchbar  } from 'react-native-paper'
import React,{useState,useEffect} from 'react'
import * as matchService from "../../services/matchService"
import {FlatList, View} from "react-native"
import SummaryCard from "./SummaryCard"
import { useNavigation } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import {getErrorMessage} from "../../helpers/ErrorHelper"

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SummaryList"
>;

export default function SummaryHeaderScreen() {
    const [data, setData] = useState<matchService.MatchClosed[]>([])
    const navigation = useNavigation<NavigationProp>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)
    const [searchQuery, setSearchQuery] = React.useState('');

    useEffect(() => {
        try{
            
            const loadData = async()=>{
                setError(null);
                setLoading(true);

                const response:matchService.MatchClosed[]  = await matchService.getClosed();

                setData(response);
            };

            loadData();
        } 
        catch(error:unknown)
        {
            setError(getErrorMessage(error));
            console.log(error);
        }
        finally
        {
            setLoading(false);
        }
    }, [])
        
    function onPress(match: matchService.MatchClosed) {
        navigation.navigate("SummaryDetail", { match });
      }

    return (
        <Surface style={{flex:1}}>

        <Text variant="titleLarge" style={{marginTop:12, textAlign:"center"}}>Estadísticas</Text>

        {loading ? (
            <ActivityIndicator
                animating={true}
                size="large"
                style={{ marginTop: 40 }}
        />
        ) : error ? (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                <Text style={{ marginBottom: 10 }}>
                    {error}
                </Text>
          </View>
        ) : (
            <View style={{margin:20}}>
                    <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}                                        
                    />
            <View style={{margin:20,width:"100%"}}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.matchId.toString()}
                    renderItem={({ item }) => (
                    <SummaryCard match={item} onPress={onPress}/>
                    )}
                />
            </View>
            </View>
        )}

        </Surface>
    )
}