import fetch from 'isomorphic-fetch'

export const handler = async ({ url }) => {
  const response = await fetch(`${url}/event-store/freeze`)
  const result = await response.text()

  //eslint-disable-next-line no-console
  console.log(result)
}

export const command = 'freeze'
export const describe = 'freeze eventstore'
