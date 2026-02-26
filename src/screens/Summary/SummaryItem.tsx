import {DataTable } from "react-native-paper"
import React from 'react'
import * as matchEventService from "../../services/matchEventService"

type Props = {
    data:matchEventService.MatchSummary[]
}

export default function SummaryItem({data}:Props) {
  return (
    <>
        {data.map((item, index) => (
            <DataTable.Row key={index}>
            <DataTable.Cell>{item.event}</DataTable.Cell>
            <DataTable.Cell numeric>{item.count}</DataTable.Cell>
            </DataTable.Row>
        ))}
      </>
  )
}