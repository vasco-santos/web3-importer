#!/usr/bin/env node
import fs from 'fs'
import process from 'process'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import csv from 'async-csv'

import { web3Import } from './lib/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.join(__dirname, '/.env.local')
})

async function main () {
  const file = process.argv[2]
  const ipfsGatewayUrl = process.env.IPFS_GATEWAY
  const web3StorageToken = process.env.WEB3_STORAGE_TOKEN
  
  if (!file) {
    throw new Error('No path specified')
  }

  if (!ipfsGatewayUrl) {
    throw new Error('No ipfs gateway url specified')
  }

  if (!web3StorageToken) {
    throw new Error('No web3 storage token specified')
  }

  // Read file from disk:
  const csvString = await fs.promises.readFile(file, 'utf-8')

  // Convert CSV string into rows
  const rows = await csv.parse(csvString)

  // Ignores header
  for (let i = 1; i < rows.length; i++) {
    await web3Import(rows[i][1], ipfsGatewayUrl, web3StorageToken)
  }

  // fs.createReadStream(file)
  //   .pipe(csv.parse({ skipLines: 1 }))
  //   .on('error', (error) => console.error(error))
  //   .on('data', (row) => web3Import(row[1], ipfsGatewayUrl, web3StorageToken))
  //   .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`))
}

main()
