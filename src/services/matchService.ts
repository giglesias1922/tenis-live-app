import {api} from "../config/api"

export interface StartMatchObject
{
    clubId:number,
    opponentName:string,
    round:string,
    notes:string,
    supertiebreak:boolean
}

export interface EndMatchObject
{
    matchId:number,
    won:boolean,
    notes:string
}

export interface Match {
    id: number;
    clubId: number;
    opponentName: string;
    round: string;
    startTime: string;     // ⚠️ siempre string en JSON
    endTime: string | null;
    notes?: string | null;
    supertiebreak:boolean,
    clubName:string,
    currentSetId:number|null,
    currentSetNumber:number|null
  }

export async function getMatches()
{
    return await api.get("/match");
}

export async function startMatch(data: StartMatchObject)
{
    const response =  await api.post("/match",data);

    return response;
 
}

export async function endMatch(id:number,data: EndMatchObject)
{
    return await api.put("/match/" + id, data);
}

export async function getActiveMatch()
{
    return await api.get<Match|null>("/match/active");
}