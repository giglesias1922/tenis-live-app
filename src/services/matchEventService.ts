import {api} from "../config/api"

export type CreateMatchEventInput =
{
    matchId:number,
    setId:number,
    eventTypeId:number
}



export type  MatchSummary =
{
    event:string,
    count:number
}

export async function CreateMatchEvent (data: CreateMatchEventInput)
{
    return await api.post("/match-event",data);
}

export async function GetSummary (matchId:number):Promise<MatchSummary[]>
{
    const response = await api.get("/match-event/summary/" + matchId);
    return response.data;
}
