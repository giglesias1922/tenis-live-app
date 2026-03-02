import {DataTable,useTheme  } from "react-native-paper"
import React from 'react'
import * as matchEventService from "../../services/matchEventService"

type Props = {
    data:matchEventService.MatchSummary[]
}

export default function SummaryItem({data}:Props) {
    const theme = useTheme();

  return (
    <>
        {data.map((item, index) => (
            <DataTable.Row key={index}
                style={{
                    borderBottomColor: theme.colors.outlineVariant,
                    borderBottomWidth: 1
                  }}
            >
            <DataTable.Cell>{item.event}</DataTable.Cell>
            <DataTable.Cell numeric>{item.count}</DataTable.Cell>
            </DataTable.Row>
        ))}
      </>
  )
}