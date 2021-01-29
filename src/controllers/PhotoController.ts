import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

import Photo from '../models/Photo'
import Like from '../models/Like'
import User from '../models/User'
import PhotoView from '../views/PhotoView'
import { firstDate } from '../utils/firstDate'

export default {
  async index (request: Request, response: Response) {
    try {
      const { limit, page } = request.query
      const data = {
        limit: parseInt((limit ? limit.toString() : '10'), 10) || 10,
        page: parseInt((page ? page.toString() : '10'), 10) || 1
      }

      const PhotoRepository = getRepository(Photo)
      const photosDB = (await PhotoRepository.find()).sort((a, b) => firstDate(a.date, b.date))

      return response.json({
        total: photosDB.length,
        limit: data.limit,
        page: data.page,
        photos: PhotoView.renderMany(photosDB
          .splice(data.limit * (data.page - 1), data.limit))
      })
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Error in index Photo, try again.' })
    }
  },
  async show (request: Request, response: Response) {
    try {
      const { id } = request.params
      const { userId } = request.body
      const data = { id: parseInt(id, 10) || 0, user: parseInt(userId, 10) || 0 }

      const PhotoRepository = getRepository(Photo)
      const photoDB = await PhotoRepository.findOne({ id: data.id })
      if (!photoDB) { return response.status(400).send({ error: 'Photo not found.' }) }

      const UserRepository = getRepository(User)
      const userDB = await UserRepository.findOne({ id: data.user })
      if (!userDB) { return response.status(400).send({ error: 'User not found.' }) }

      const LikeRepository = getRepository(Like)
      const likes = await LikeRepository.count({ photo: photoDB })
      const likeDB = await LikeRepository.findOne({ user: userDB, photo: photoDB })

      return response.json(PhotoView.renderLike(photoDB, likes, userDB, likeDB))
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Erron in show Photo, try again.' })
    }
  }
}
