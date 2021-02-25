import type { CurrentStoreApi } from './types'

const insert: CurrentStoreApi['insert'] = async (
  { inlineLedgerRunQuery, escapeId, escapeStr, tablePrefix },
  readModelName,
  tableName,
  document
) => {
  await inlineLedgerRunQuery(
    `INSERT INTO ${escapeId(`${tablePrefix}${tableName}`)}(${Object.keys(
      document
    )
      .map((key) => escapeId(key))
      .join(', ')})
      VALUES(${Object.keys(document)
        .map(
          (key) => `CAST(${escapeStr(JSON.stringify(document[key]))} AS JSON)`
        )
        .join(', ')});
    `
  )
}

export default insert
