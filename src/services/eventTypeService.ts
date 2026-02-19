import {api} from "../config/api"

export type EventTypeRow ={
    id: number
    code: string
    description: string
    buttonColour?:string
    buttonGroup?:string
    buttonOrder?:number
    buttonText?:string
}

export async function getEventTypes(): Promise<EventTypeRow[]>
{
    const response = await api.get<EventTypeRow[]>("/event-types");

    return response.data;
}