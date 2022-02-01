import { Db, MongoClient } from 'mongodb'

let cachedDb: Db

export async function connectDatabase(url: string) {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(url)

  const db = client.db('podcastr')

  cachedDb = db

  return db
}
