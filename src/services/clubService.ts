import {api} from "../config/api"

export async function getClubes()
{
    
    return await api.get("/club");
}