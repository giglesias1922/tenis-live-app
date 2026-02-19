import {api} from "../config/api"

export type CreateMatchEventInput =
{
    matchId:number,
    setId:number,
    eventTypeId:number
}

export async function CreateMatchEvent (data: CreateMatchEventInput)
{
    console.log("Entro");
    return await api.post("/match-event",data);
}
