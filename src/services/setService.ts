import {api} from "../config/api"

export type CloseSetInput ={
    setId:number,
    playerGames:number,
    opponentGames:number
}

export async function name(data:CloseSetInput) {
    return await api.put("/set/end/" + data.setId,data);

}