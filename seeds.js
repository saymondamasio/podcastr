const MongoClient = require('mongodb').MongoClient

const serverJSON = require('./server.json')

require('dotenv/config')

async function seedDB() {
  console.log('Seeding database...', process.env.MONGODB_URL)
  const client = await MongoClient.connect(
    process.env.MONGODB_URL || 'mongodb://localhost:27017/podcastr'
  )

  try {
    await client.connect()
    const collection = client.db('podcastr').collection('episodes')
    await collection.drop()

    await collection.insertMany(serverJSON.episodes)

    await client.close()
  } catch (error) {
    console.log(error)
  }
}

seedDB()
