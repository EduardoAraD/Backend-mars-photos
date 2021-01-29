import axios from 'axios'
import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

import Photo from '../models/Photo'

interface PhotoApi {
    id: number,
    // eslint-disable-next-line camelcase
    img_src: string,
    // eslint-disable-next-line camelcase
    earth_date: string,
}

export default {
  async getApiRequest (request: Request, response: Response) {
    try {
      const { id } = request.query
      const data = { id: `${id}` || '' }

      if (data.id === process.env.KEY) {
        await getApiDay()
      }
      return response.send({ message: 'Atualizado' })
    } catch (e) {
      console.log(e)
      return response.status(400).send({ error: 'Error in atualization Api' })
    }
  },

  async getApi () {
    try {
      const date = new Date()
      const startDate = new Date('2021-1-1 12:00')
      const days = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

      const PhotoRepository = getRepository(Photo)
      const photos = await PhotoRepository.find()
      if (photos.length > 0) { return getApiDay() }

      for (let i = 0; i < (days - 1); i++) {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}&camera=mast&api_key=${process.env.KEY_API}`)

        const photos = response.data.photos
        photos.map((item: PhotoApi) => createPhoto(item))

        startDate.setDate(startDate.getDate() + 1)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

async function getApiDay () {
  try {
    const date = new Date()

    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&camera=mast&api_key=${process.env.KEY_API}`)

    const photos = response.data.photos
    photos.map((item: PhotoApi) => createPhoto(item))
  } catch (e) {
    console.log(e)
  }
}

async function createPhoto (photoApi: PhotoApi) {
  const data = {
    description: '',
    like: 0,
    url: photoApi.img_src,
    date: photoApi.earth_date
  }

  const PhotoRepository = getRepository(Photo)
  const photoDB = await PhotoRepository.findOne({ url: data.url })
  if (!photoDB) {
    const photoCreate = PhotoRepository.create(data)
    PhotoRepository.save(photoCreate)
  }
}
