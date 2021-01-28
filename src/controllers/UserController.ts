import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

import User from '../models/User'
import UserView from '../views/UserView'

export default {
  async show (request: Request, response: Response) {
    try {
      const { id } = request.params
      const data = { id: parseInt(id, 10) || 0 }

      const UserRepository = getRepository(User)
      const userDB = await UserRepository.findOne({ id: data.id })
      if (!userDB) {
        return response.status(400).send({ error: 'User not found.' })
      }

      return response.json(UserView.render(userDB))
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Error in Show User, try again.' })
    }
  },
  async create (request: Request, response:Response) {
    try {
      const { name } = request.body
      const data = { name: `${name}` || '' }
      if (data.name === '') {
        return response.status(400).send({ error: 'Name not informad' })
      }

      const UserRepository = getRepository(User)
      const userDB = await UserRepository.findOne({ name: data.name })
      if (userDB) {
        return response.status(400).send({ error: 'Existing name' })
      }

      const userCreate = UserRepository.create(data)
      const userSave = await UserRepository.save(userCreate)

      return response.json(UserView.render(userSave))
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Error in create user, try again.' })
    }
  },
  async delete (request: Request, response: Response) {
    try {
      const { id } = request.params
      const data = { id: parseInt(id, 10) || 0 }

      const UserRepository = getRepository(User)
      const userDB = await UserRepository.findOne({ id: data.id })
      if (!userDB) {
        return response.status(400).send({ error: 'User not found' })
      }

      UserRepository.delete({ id: userDB.id })
      return response.send()
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Error in delete user, try again.' })
    }
  }
}
