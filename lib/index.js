import { Web3Storage } from 'web3.storage'
import fetch from '@web-std/fetch'
import pRetry from 'p-retry'

/**
 * @param {string} rootCid
 * @param {string} ipfsGatewayUrl
 * @param {string} web3StorageToken
 */
export async function web3Import (rootCid, ipfsGatewayUrl, web3StorageToken) {
  // Get raw content
  const response = await pRetry(() => fetch(
    `${ipfsGatewayUrl}/api/v0/dag/export?arg=${rootCid}`
  ), {
    retries: 10
  })

  if (!response.ok) {
    const err = await response.text()
    console.log(`${ipfsGatewayUrl}/api/v0/dag/export?arg=${rootCid}`)
    console.log('err', err)
    throw new Error(`Failed to dag export ${rootCid}: ${err}`)
  }

  console.log(`Successfully found ${rootCid}`)

  // Construct with token and endpoint
  const client = new Web3Storage({ token: web3StorageToken })

  // @ts-ignore Node Readable Stream
  const cid = await client.put([{
    name: rootCid,
    stream: () => response.body
  }])

  console.log(`Added ${cid} to web3.storage`)
}
