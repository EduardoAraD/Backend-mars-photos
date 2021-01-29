import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

import Like from '../models/Like'
import Photo from '../models/Photo'
import User from '../models/User'
import LikeView from '../views/LikeView'

export default {
  async create (request: Request, response: Response) {
    try {
      const { photo, user } = request.body
      const data = {
        photo: parseInt(photo, 10) || 0,
        user: parseInt(user, 10) || 0
      }

      const PhotoRepository = getRepository(Photo)
      const photoDB = await PhotoRepository.findOne({ id: data.photo })
      if (!photoDB) { return response.status(400).send({ error: 'Photo not found.' }) }

      const UserRepository = getRepository(User)
      const userDB = await UserRepository.findOne({ id: data.user })
      if (!userDB) { return response.status(400).send({ error: 'User not found' }) }

      const LikeRepository = getRepository(Like)
      const likeDB = await LikeRepository.findOne({ photo: photoDB, user: userDB })
      if (likeDB) { return response.status(400).send({ error: 'You already liked the photo.' }) }

      const dataLike = {
        photo: photoDB,
        user: userDB
      }
      const likeCreate = LikeRepository.create(dataLike)
      const likeSave = await LikeRepository.save(likeCreate)

      return response.json(LikeView.render(likeSave))
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Error in create like, try again.' })
    }
  },
  async show (request: Request, response: Response) {
    try {
      const { id } = request.params
      const data = { id: parseInt(id, 10) || 0 }

      const LikeRepository = getRepository(Like)
      const likeDB = await LikeRepository.findOne({ id: data.id }, { relations: ['photo', 'user'] })
      if (!likeDB) { return response.status(400).send({ error: 'Like not found.' }) }

      return response.json(LikeView.render(likeDB))
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Error in show like, try again.' })
    }
  },
  async delete (request: Request, response: Response) {
    try {
      const { id } = request.params
      const data = { id: parseInt(id, 10) || 0 }

      const LikeRepository = getRepository(Like)
      const likeDB = await LikeRepository.findOne({ id: data.id })
      if (!likeDB) { return response.status(400).send({ error: 'Like not found.' }) }

      LikeRepository.delete({ id: likeDB.id })
      return response.send()
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Error in delete like, try again.' })
    }
  }
}
