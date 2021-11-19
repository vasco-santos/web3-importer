# web3 importer

> Exports a [CAR](https://ipld.io/specs/transport/car/carv1/) file with a given CID from a IPFS gateway and uploads it into [web3.storage](https://web3.storage).

## Usage

```sh
npm install web3-importer
```

```js
const rootCid = 'bafy...'
const ipfsGatewayUrl = 'https://ipfs.io'
const web3StorageToken = 'eyJhbGc...' // Get it from web3.storage
await web3Import(rootCid, ipfsGatewayUrl, web3StorageToken)
```
