import React,{useState,useEffect} from "react";
import { View, StyleSheet, Vibration } from "react-native";
import { Text, Button, Surface } from "react-native-paper";
import * as matchEventService from "../../services/matchEventService"
import * as eventTypesService from "../../services/eventTypeService"
import { MatchAction } from "./MatchAction";

type Props = {
  matchId:number, 
  setId:number
}

const MatchActions = ({matchId,setId}:Props) => {
    const [data, setdata] = useState<eventTypesService.EventTypeRow[]>([])

    const onAction = (eventId: number) => {

      try{
        const data:matchEventService.CreateMatchEventInput={
          matchId: matchId,
          setId: setId,
          eventTypeId: eventId
        };

        matchEventService.CreateMatchEvent(data);

        Vibration.vibrate(20);
      }
      catch(error)
      {
        console.log(error);
      }

    };

    useEffect(() => {
      const load = async() => {
        try{
        const response:eventTypesService.EventTypeRow[] = await eventTypesService.getEventTypes();      

        setdata(response);
        }
        catch(error)
        {
          console.log(error);
        }
      };

      load();

    }, [])
    

    function getFilterData(EventGroup:string):eventTypesService.EventTypeRow[]
    {
      return data
      .filter(e => e.buttonGroup === EventGroup)
      .sort((a, b) => (a.buttonOrder ?? 0) - (b.buttonOrder ?? 0));
    }

  return (
    <Surface style={styles.container}>


      {/* IZQUIERDA */}
      <Surface style={styles.column}>
        <Surface style={styles.section}>
          <Text style={styles.title}>SERVICIO</Text>
          <MatchAction data= {getFilterData("SERVICE")}  onAction={onAction}></MatchAction>
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.title}>WINNERS</Text>
          <MatchAction data= {getFilterData("WINNER")}  onAction={onAction}></MatchAction>
        </Surface>

      </Surface>

      {/* DERECHA */}
      <Surface style={styles.column}>
        <Surface style={styles.section}>
          <Text style={styles.title}>ERRORES</Text>
          <MatchAction data= {getFilterData("ERROR")}  onAction={onAction}></MatchAction>
        </Surface>

        <Surface style={styles.section}>
          <Text style={styles.title}>BREAK POINT</Text>
          <MatchAction data= {getFilterData("BREAKPOINT")}  onAction={onAction}></MatchAction>
        </Surface>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },

  column: {
    flex: 1,
  },

  section: {
    marginBottom: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  

  
});

export default MatchActions;