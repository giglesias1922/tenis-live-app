import {api} from "../config/api"

export async function getEventTypes()
{
    return await api.get("/event-types");
}