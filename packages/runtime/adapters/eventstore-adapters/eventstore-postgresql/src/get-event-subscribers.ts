import { AdapterPool } from './types'

const getEventSubscribers = async (
  pool: AdapterPool,
  {
    applicationName,
    eventSubscriber,
  }:
    | {
        applicationName?: string
        eventSubscriber?: string
      }
    | undefined = {}
): Promise<
  Array<{
    applicationName: string
    eventSubscriber: string
    destination: any
    status: any
  }>
> => {
  const {
    subscribersTableName,
    databaseName,
    executeStatement,
    escapeId,
    escape,
  } = pool
  const databaseNameAsId = escapeId(databaseName)
  const subscribersTableNameAsId = escapeId(subscribersTableName)

  const rows = (await executeStatement(`
    SELECT * FROM ${databaseNameAsId}.${subscribersTableNameAsId}
    ${
      applicationName != null || eventSubscriber != null
        ? `
    WHERE ${
      applicationName != null
        ? `"applicationName" = ${escape(applicationName)}`
        : ''
    }
    ${applicationName != null && eventSubscriber != null ? ' AND ' : ''}
    ${
      eventSubscriber != null
        ? `"eventSubscriber" = ${escape(eventSubscriber)}`
        : ''
    }
    `
        : ''
    }
  `)) as Array<{
    applicationName: string
    eventSubscriber: string
    destination: any
    status: any
  }>

  return rows
}

export default getEventSubscribers
