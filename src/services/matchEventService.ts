import {api} from "../config/api"

export type CreateMatchEventInput =
{
    matchId:number,
    setId:number,
    eventTypeId:number
}

export async function CreateMatchEvent (data: CreateMatchEventInput)
{
    return await api.post("/match-event",data);
}
