import { NextApiRequest, NextApiResponse } from 'next'
import { connectDatabase } from '../../../services/mongo'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'GET') {
    const { _limit, _sort, _order, episodeId } = request.query

    try {
      const db = await connectDatabase(process.env.MONGODB_URL!)
      const episodesCollection = db.collection('episodes')

      if (episodeId) {
        const episode = episodesCollection.findOne({ id: episodeId })

        return response.status(200).json(episode)
      } else {
        const episodes = episodesCollection
          .find()
          .limit(parseInt(_limit as string, 10))

        if (_sort) {
          episodes.sort({ [String(_sort)]: _order === 'desc' ? -1 : 1 })
        }
        return response.status(200).json(episodes.toArray())
      }
    } catch (error) {
      console.log(error)

      response.status(500).end('Error connecting to database')
    }
  } else {
    response.setHeader('Allow', 'GET')
    response.status(405).end(`Method ${request.method} Not Allowed`)
  }
}
