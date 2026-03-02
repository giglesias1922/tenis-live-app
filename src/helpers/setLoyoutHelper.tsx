
export type Set = 
{
    opponentGames:number
    playerGames:number,
    setNumber:number,
    won:boolean
}

export function GetResultText(sets: Set[]):string
{
    return sets
    .sort((a, b) => a.setNumber - b.setNumber)
    .map(set => {

      // si es tie break largo mostramos con -
      if (set.playerGames >= 7 || set.opponentGames >= 7) {
        return `${set.playerGames}-${set.opponentGames}`;
      }

      return `${set.playerGames}/${set.opponentGames}`;
    })
    .join(" ");
}