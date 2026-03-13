import { Surface, Text,ActivityIndicator ,Button  } from 'react-native-paper'
import React,{useState,useEffect} from 'react'
import * as matchService from "../../services/matchService"
import * as clubService from "../../services/clubService"
import {FlatList, View} from "react-native"
import SummaryCard from "./SummaryCard"
import { useNavigation } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import {getErrorMessage} from "../../helpers/ErrorHelper"
import SummaryFilter from './SummaryFilter'
import {Club} from "../../models/Club"
import {ClosedMatchFilter} from "../../models/ClosedMatchFilter"

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SummaryList"
>;


  
export default function SummaryHeaderScreen() {
    const [data, setData] = useState<matchService.MatchClosed[]>([])
    const navigation = useNavigation<NavigationProp>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null)
    const [showFilter, setShowFilter] = React.useState(false);
    const [clubData, setClubData] = useState<Club[]>([]);
    const [filterData, setFilterData] = useState<ClosedMatchFilter>({clubId:undefined,fromDate:undefined,opponent:undefined });

    useEffect(() => {

        const loadData = async () => {
            try {
    
                setError(null);
                setLoading(true);
    
                const response = await matchService.getClosed(filterData);
                setData(response);
    
                const responseClub = await clubService.getClubes();
                setClubData(responseClub.data);
    
            } catch (error: unknown) {
    
                setError(getErrorMessage(error));
    
            } finally {
    
                setLoading(false);
    
            }
        };
    
        loadData();
    
    }, [filterData]);
        
    function onPress(match: matchService.MatchClosed) {
        navigation.navigate("SummaryDetail", { match });
      }

    return (
        <Surface style={{flex:1}}>

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
                <Button
                    icon="filter"
                    mode="outlined"
                    onPress={() => setShowFilter(true)}
                    >
                    Filter
                </Button>
                    
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

        <SummaryFilter 
            visible={showFilter}  
            onDismiss={()=>setShowFilter(false)}
            clubData={clubData}
            setFilterData={setFilterData}
            ></SummaryFilter>

        </Surface>

        
    )
}