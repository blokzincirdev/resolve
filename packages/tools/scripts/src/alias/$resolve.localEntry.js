export default () => `
  import '$resolve.guardOnlyServer'
  import { connectPublisher, createAndInitConsumer } from '@resolve-js/local-event-broker'
  import serverAssemblies from '$resolve.serverAssemblies'
  import eventBrokerConfig from '$resolve.eventBrokerConfig'
  import localEntry from '@resolve-js/runtime/lib/local'

  export { default as entryPointMarker } from '@resolve-js/runtime/lib/common/utils/entry-point-marker'
  
  Object.assign(serverAssemblies.assemblies, {
    eventBrokerConfig,
    createAndInitConsumer,
    connectPublisher
  })

  const initPromise = localEntry(serverAssemblies)

  const handler = async (...args) => {
    const worker = await initPromise
    return await worker(...args)
  }

  export default handler
`