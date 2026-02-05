import {api} from "../config/api"

export async function getMatches()
{
    return await api.get("/match");
}